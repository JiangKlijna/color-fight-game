package com.jiangKlijna.cfg

import io.vertx.core.Vertx.vertx

object App {

    @JvmStatic
    fun main(args:Array<String>) {
        vertx().createHttpServer()
                .requestHandler { req ->
                    req.response()
                            .putHeader("content-type", "text/plain")
                            .end("Hello from Vert.x")
                }.listen(8080)
    }
}