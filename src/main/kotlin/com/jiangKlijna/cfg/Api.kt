package com.jiangklijna.cfg

import io.vertx.core.json.JsonObject
import java.lang.Exception

class Api {

    fun getRooms(pageNum: Int, pageSize: Int): List<GameRoom> {
        return emptyList()
    }

    companion object {
        const val Success = 0
        const val Failure = 1

        @JvmStatic
        fun Api.invoke(obj: JsonObject): JsonObject {
            return try {
                val functionName = obj.getString("f") ?: throw NullPointerException("obj has no attribute 'f'")
                val parameters = obj.getJsonObject("p") ?: throw NullPointerException("obj has no attribute 'p'")
                val method = try {
                    this.javaClass.getDeclaredMethod(functionName)
                } catch (e: NoSuchMethodException) {
                    throw NullPointerException("api has no method '$functionName'")
                }
                val args = Array(method.parameterCount) {
                    parameters.getValue(method.parameters[it].name)
                            ?: throw NullPointerException("obj['p'] has no attribute '${method.parameters[it].name}'")
                }
                method.isAccessible = true
                val result = method.invoke(this, args)
                JsonObject().put("c", Success).put("o", result)
            } catch (e: Exception) {
                JsonObject().put("c", Failure).put("m", e.message)
            }
        }
    }
}