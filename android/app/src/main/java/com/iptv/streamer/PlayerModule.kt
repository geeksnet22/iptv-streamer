package com.iptv.streamer

import android.os.Handler
import android.os.Looper
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

import com.iptv.streamer.PlayerViewManager

class PlayerModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  private val mainHandler = Handler(Looper.getMainLooper())

  override fun getName(): String {
    return "PlayerModule"
  }

  @ReactMethod
  fun stop() {
    mainHandler.post { 
      PlayerViewManager.exoPlayer?.stop()
    }
  }
}