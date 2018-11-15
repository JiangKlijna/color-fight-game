package com.jiangklijna.cfg

import java.util.concurrent.ConcurrentSkipListMap
import java.util.concurrent.CopyOnWriteArrayList

class GameRoom(val title: String, val length: Int) {
    private val players = CopyOnWriteArrayList<GamePlayer?>()

    fun join(player: GamePlayer) = if (players.size == length) false else players.add(player)

    fun quit(player: GamePlayer) = if (player in players) players.remove(player) else false

    fun size() = players.size

    fun id() = hashCode()

    operator fun get(i: Int) = players[i]

    operator fun contains(player: GamePlayer) = players.contains(player)

    operator fun iterator() = players.iterator()

    operator fun invoke() = RoomData(title, length)

    companion object {
        private val rooms = ConcurrentSkipListMap<Int, GameRoom>()

        operator fun get(id: Int) = rooms[id]

        operator fun contains(id: Int) = rooms.contains(id)

        operator fun iterator() = rooms.iterator()

        fun createRoom(player: GamePlayer, title: String, size: Int) {
            val room = GameRoom(title, size)
            rooms[room.id()] = room
            room.join(player)
        }

        data class RoomData(val title: String, val length: Int)
    }
}