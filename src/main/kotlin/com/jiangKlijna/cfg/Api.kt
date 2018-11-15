package com.jiangklijna.cfg

import io.vertx.core.json.JsonObject

class Api {

    /**
     * @param pageNum [0-size]
     * @param pageSize 10
     * @return list[pageNum*pageSize:(pageNum+1)*pageSize]
     */
    fun getRooms(pageNum: Int, pageSize: Int): List<GameRoom.Companion.RoomData> {
        var i = 0
        val s = pageNum * pageSize
        val e = (pageNum + 1) * pageSize - 1
        val list = ArrayList<GameRoom.Companion.RoomData>(pageSize)
        for (room in GameRoom) {
            if (i in s..e) {
                list.add(room.value())
            }
            i++
        }
        return list
    }

    companion object {
        const val Success = 0
        const val Failure = 1

        fun success(result: Any) = JsonObject().put("c", Success).put("o", result)

        fun failure(e: Exception) = JsonObject().put("c", Failure).put("m", e.message)

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
                success(result)
            } catch (e: Exception) {
                failure(e)
            }
        }
    }
}