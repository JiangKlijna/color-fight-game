package com.jiangklijna.cfg

import java.util.concurrent.ConcurrentSkipListMap
import java.util.concurrent.CopyOnWriteArrayList

class GameRoom(val title: String, val length: Int) {
    private val players = CopyOnWriteArrayList<GamePlayer?>()

    fun join(player: GamePlayer) = if (players.size == length) false else players.add(player)

    fun size() = players.size

    fun id() = hashCode()

    operator fun contains(player: GamePlayer) = players.contains(player)

    operator fun get(i: Int) = players[i]

    companion object {
        private val rooms = ConcurrentSkipListMap<Int, GameRoom>()

        operator fun get(id: Int) = rooms[id]

        operator fun contains(id: Int) = rooms.contains(id)

        fun createRoom(player: GamePlayer, title: String, size: Int) {
            val room = GameRoom(title, size)
            rooms[room.id()] = room
            room.join(player)
        }
    }
}