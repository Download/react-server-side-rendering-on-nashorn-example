var
path = require('path'),
gulp = require('gulp'),
gutil = require('gulp-util'),
notify = require('gulp-notify'),
browserify = require('browserify'),
watchify = require('watchify'),
streamify = require('streamify'),
uglify = require('gulp-uglify'),
source = require('vinyl-source-stream'),
buffer = require('vinyl-buffer'),
sourcemaps = require('gulp-sourcemaps'),
fs = require('fs');

function handleError(task) {
	return function(err) {
		notify.onError(task + ' failed.')(err);
	};
}

function bundle(pkg, bundle, dest, watch, min, map) {
	var shimCfg = pkg['browserify-shim'];
	var externals = [];
	for (var prop in shimCfg) {
		var shim = shimCfg[prop];
		var exp = typeof shim == 'string' ? shim : shim.exports;
		var idx = exp.indexOf(':');
		if (idx !== -1) {exp = exp.substring(idx + 1);}
		if (exp) {externals.push(prop);}
	}
	gutil.log('externals=' + externals);
	dest = dest || pkg.directories.dist;
	gutil.log('dest=' + dest);
	var bundler;
	function rebundle() {
		gutil.log('(Re-)bundling...');
		var pkg = JSON.parse(fs.readFileSync('./package.json'));
		var stream = bundler.bundle();
		stream.on('error', handleError('Browserify'));
		stream = stream
			.pipe(source(bundle))
			.pipe(buffer())
			.pipe(sourcemaps.init({loadMaps: true}));
		if (min) {stream = stream.pipe(uglify());}
		if (map) {stream = stream.pipe(sourcemaps.write('./'));}
		return stream.pipe(gulp.dest(dest));
	}

	gutil.log('Creating bundler...');
	bundler = browserify({
		basedir: path.join(__dirname, pkg.directories.src), 
		entries: pkg.entries,
		extensions: pkg.extensions,
		debug: watch, 
		cache: {}, // required for watchify
		packageCache: {}, // required for watchify
		fullPaths: watch // required to be true only for watchify
	});
	if (watch) {
		bundler = watchify(bundler); 
		bundler.on('update', function(){
			return rebundle(); 
		});
	}
	bundler.transform('babelify').external(externals);
	bundler.transform('browserify-shim', {global: true});
	return rebundle();
}

 
gulp.task('build-watch', function () {
	var pkg = JSON.parse(fs.readFileSync('./package.json'));
	return bundle(pkg, pkg.dist.umd, pkg.build, true, false, false);
});
 
gulp.task('build-umd', function () {
	var pkg = JSON.parse(fs.readFileSync('./package.json'));
	return bundle(pkg, pkg.dist.umd, pkg.build, false, false, true);
});
 
gulp.task('build-min', function () {
	var pkg = JSON.parse(fs.readFileSync('./package.json'));
	return bundle(pkg, pkg.dist.min, pkg.build, false, true, true);
});
 
gulp.task('dist-umd', function () {
	var pkg = JSON.parse(fs.readFileSync('./package.json'));
	return bundle(pkg, pkg.dist.umd, pkg.directories.dist, false, false, true);
});
 
gulp.task('dist-min', function () {
	var pkg = JSON.parse(fs.readFileSync('./package.json'));
	return bundle(pkg, pkg.dist.min, pkg.directories.dist, false, true, true);
});
 
gulp.task('default', ['build-watch']);
gulp.task('release', ['build-umd', 'build-min', 'dist-umd', 'dist-min']);
