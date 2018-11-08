package com.jiangklijna.cfg

import io.vertx.core.Vertx.vertx
import io.vertx.ext.web.Router
import io.vertx.ext.web.handler.StaticHandler

class App {

    private val vertx = vertx()

    private val setting = Setting("app.properties")

    fun start(args: Array<String>) {
        val r = Router.router(vertx)
        r.route().handler(StaticHandler.create(setting.static))
        val server = vertx.createHttpServer()
        server.websocketHandler(WebSocket.handler)
        server.requestHandler(r::accept).listen(setting.port)
    }

    companion object {
        @JvmStatic
        fun main(args: Array<String>) = App().start(args)
    }

}