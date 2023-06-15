export function readJsonFromScript() {
    if (document.getElementById('saviJSON')) {
        return JSON.parse(document.getElementById('saviJSON').textContent.trim())
    } else return null
}

export const videoPlayerAttributes = {
    videoPlyrContainer: { attribute: "[custom_video-player]", role: "player", element: null, functionName: "Player" },
    playPauseBtnContainer: { attribute: "[play-pause-btn]", role: "play-pause", element: null, functionName: "PlayPauseBtn" },
    muteUnmuteBtnContainer: { attribute: "[mute-unmute-btn]", role: "mute-unmute", element: null, functionName: "MuteUnmuteBtn" },
    playBtnContainer: { attribute: "[play-btn]", role: "play", element: null, functionName: "PlayBtn" },
    pauseBtnContainer: { attribute: "[pause-btn]", role: "pause", element: null, functionName: "PauseBtn" },
    muteBtnContainer: { attribute: "[mute-btn]", role: "mute", element: null, functionName: "MuteBtn" },
    unmuteBtnContainer: { attribute: "[unmute-btn]", role: "unmute", element: null, functionName: "UnmuteBtn" },
    loaderContainer: { attribute: "[loader]", role: "loader", element: null, functionName: "Loader" },
    currentTime: { attribute: "[current-time]", role: "current-time", element: null, functionName: "CurrentTime" },
    totalTime: { attribute: "[total-time]", role: "total-time", element: null, functionName: "TotalTime" },
    volumeControl: { attribute: "[volume-control]", role: "volume-control", element: null, functionName: "VolumeControl" },
    miniplayer: { attribute: "[miniplayer]", role: "miniplayer", element: null, functionName: "MiniPlayer" },
    fullScreen: { attribute: "[full-screen]", role: "full-screen", element: null, functionName: "FullScreen" },
    theaterMode: { attribute: "[theater-mode]", role: "theater-mode", element: null, functionName: "TheaterMode" },
    skipForward: { attribute: "[skip-forward]", role: "skip-forward", element: null, functionName: "skipForward" },
    skipBackward: { attribute: "[skip-backward]", role: "skip-backward", element: null, functionName: "skipBackward" },
    seekbar: { attribute: "[video-seeker]", role: "video-seeker", element: null, functionName: "handleSeekbar" },
    speedDropDown: { attribute: "[video-speed-dropdown]", role: "video-speed", element: null, functionName: "handlePlayBackRate" }

}