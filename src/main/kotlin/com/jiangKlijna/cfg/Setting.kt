package com.jiangklijna.cfg

class Setting(filename: String) {

    val map = java.util.Properties()

    init {
        val ins = javaClass.getResourceAsStream(filename)
        ins?.let {  map.load(it) }
    }

    val port by lazy {
        try {
            map["port"]?.toString()?.toInt()
        } catch (_: NumberFormatException) {
            null
        } ?: 8080
    }

    val static by lazy { map["port"]?.toString() ?: "html/" }
}