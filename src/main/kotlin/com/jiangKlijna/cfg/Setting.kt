package com.jiangklijna.cfg

import java.lang.NumberFormatException

class Setting(filename: String) {

    val map = java.util.Properties()

    init {
        map.load(javaClass.getResourceAsStream(filename))
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