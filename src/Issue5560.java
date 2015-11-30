import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

import jdk.nashorn.api.scripting.ScriptObjectMirror;

public class Issue5560 {
	public static interface TwoStepRenderer {
		ScriptObjectMirror route(String path);
		String render(Object props);
	}

	public static interface SimpleRenderer {
		String render();
	}

	public static void main(String[] args) throws ScriptException, UnsupportedEncodingException, FileNotFoundException {
		ScriptEngine engine = new ScriptEngineManager().getEngineByName("nashorn");
		engine.eval("var global = this;");
		System.out.println("Loading script: react.js");
		engine.eval(new InputStreamReader(new FileInputStream(new File("react.js")), "utf-8"));
		System.out.println("Loading script: react-dom.js");
		engine.eval(new InputStreamReader(new FileInputStream(new File("react-dom.js")), "utf-8"));
		System.out.println("Loading script: react-dom-server.js");
		engine.eval(new InputStreamReader(new FileInputStream(new File("react-dom-server.js")), "utf-8"));
		System.out.println("Loading script: History.js");
		engine.eval(new InputStreamReader(new FileInputStream(new File("History.js")), "utf-8"));
		System.out.println("Loading script: ReactRouter.js");
		engine.eval(new InputStreamReader(new FileInputStream(new File("ReactRouter.js")), "utf-8"));
		System.out.println("Loading script: bundle.js");
		engine.eval(new InputStreamReader(new FileInputStream(new File("bundle.js")), "utf-8"));
		Object jsRenderer = engine.get("twoStepRenderer");
		System.out.println("Got twoStepRenderer object: " + jsRenderer);
		TwoStepRenderer renderer = ((Invocable) engine).getInterface(jsRenderer, TwoStepRenderer.class);
		ScriptObjectMirror routeResult = renderer.route("/");
		Object props = routeResult.get("props");
		String markup = renderer.render(props);
		System.out.println("Server-side generated markup (using TwoStepRenderer)");
		System.out.println("----------------------------------");
		System.out.print(markup);
		System.out.println("\n----------------------------------");
		
		SimpleRenderer simple = ((Invocable) engine).getInterface(SimpleRenderer.class);
		markup = simple.render();
		System.out.println("Server-side generated markup (using SimpleRenderer)");
		System.out.println("----------------------------------");
		System.out.print(markup);
		System.out.println("\n----------------------------------");
	}

}
