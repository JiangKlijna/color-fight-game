package com.jiangklijna.cfg

import java.util.concurrent.ConcurrentHashMap

class GameRoom(val title: String, val size: Int) {
    private val players = Array<GamePlayer?>(size) { null }

    companion object {
        private val rooms = ConcurrentHashMap<String, GameRoom>()

        operator fun get(id: String) = rooms[id]

        operator fun contains(id: String) = rooms.contains(id)

        fun createRoom(player: GamePlayer, title: String, size: Int) {
            
        }
    }
}