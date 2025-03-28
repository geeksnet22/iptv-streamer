package com.tv.streamer

import android.content.Context
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.google.android.exoplayer2.ExoPlayer
import com.google.android.exoplayer2.MediaItem
import com.google.android.exoplayer2.ui.PlayerView

class PlayerViewManager : SimpleViewManager<PlayerView>() {

    companion object {
        var exoPlayer: ExoPlayer? = null
    }

    override fun getName(): String {
        return "RCTPlayerView"
    }

    override fun createViewInstance(reactContext: ThemedReactContext): PlayerView {
        val playerView = PlayerView(reactContext)
        exoPlayer = ExoPlayer.Builder(reactContext).build()
        playerView.player = exoPlayer
        playerView.useController = false
        playerView.setShowBuffering(PlayerView.SHOW_BUFFERING_WHEN_PLAYING)
        return playerView
    }

    @ReactProp(name = "url")
    fun setUrl(view: PlayerView, url: String) {
        val mediaItem = MediaItem.fromUri(url)
        exoPlayer?.setMediaItem(mediaItem)
        exoPlayer?.prepare()
        exoPlayer?.playWhenReady = true
    }
}