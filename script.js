document.addEventListener('DOMContentLoaded', function() {
    var audioPlayer = document.getElementById('audioPlayer');
    var playButton = document.getElementById('playButton');
    var pauseButton = document.getElementById('pauseButton');
    var volumeControl = document.getElementById('volumeControl');
    var currentTime = document.getElementById('currentTime');
    var duration = document.getElementById('duration');
    var songList = document.getElementById('songList');
    var searchBox = document.getElementById('searchBox');
    var currentSongInfo = document.getElementById('currentSongInfo'); // 用于显示当前播放歌曲信息的元素

    // 假设HTML中有一个元素用于显示当前播放歌曲信息，例如：
    // <div id="currentSongInfo"></div>

    // 歌曲数据
    var songs = [
        { title: "I", artist: "Athletics", src: "src/I-Athletics.mp3"},
        {title: "II", artist: "Athletics",src: "src/II-Athletics.mp3"},
        { title: "III", artist: "Athletics", src: "src/III-Athletics.mp3"},
        {title: "IV", artist: "Athletics",src: "src/IV-Athletics.mp3"},
        {title: "V", artist: "Athletics",src: "src/V-Athletics.mp3"},
        {title: "VI", artist: "Athletics",src: "src/VT-Athletics.mp3"},
        //{title: ", artist: "",src: "src/"},
        // 更多歌曲...
    ];

// 渲染歌曲列表
    function renderSongList(songs) {
        songList.innerHTML = '';
        songs.forEach(function(song) {
            var listItem = document.createElement('li');
            listItem.textContent = `${song.title} - ${song.artist}`;
            listItem.dataset.src = song.src; // 存储歌曲的src属性
            listItem.onclick = function() {
                playSong(listItem);
            };
            songList.appendChild(listItem);
        });
    }

    // 播放歌曲
    function playSong(listItem) {
        var songSrc = listItem.dataset.src;
        audioPlayer.src = songSrc;
        audioPlayer.load(); // 确保音频重新加载
        audioPlayer.play();
        updateNowPlayingInfo(listItem);
    }

    // 更新播放信息
    function updateNowPlayingInfo(listItem) {
        var songTitle = listItem.textContent;
        currentSongInfo.textContent = `当前播放: ${songTitle}`;
    }

    // 更新播放时间
    function updateTime() {
        var minutes = Math.floor(audioPlayer.currentTime / 60);
        var seconds = Math.floor(audioPlayer.currentTime % 60);
        currentTime.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    // 搜索功能
    function filterSongs() {
        var searchTerm = searchBox.value.toLowerCase();
        var filteredSongs = songs.filter(function(song) {
            return song.title.toLowerCase().includes(searchTerm) || song.artist.toLowerCase().includes(searchTerm);
        });
        renderSongList(filteredSongs);
    }

    // 绑定按钮事件
    playButton.addEventListener('click', function() {
        audioPlayer.play();
    });

    pauseButton.addEventListener('click', function() {
        audioPlayer.pause();
    });

    // 音量控制
    volumeControl.addEventListener('input', function() {
        audioPlayer.volume = parseFloat(volumeControl.value);
    });

    // 音频时间更新
    audioPlayer.addEventListener('timeupdate', updateTime);

    // 音频加载完成
    audioPlayer.addEventListener('loadedmetadata', function() {
        duration.textContent = `/${Math.floor(audioPlayer.duration)}`;
    });

    // 音频播放结束
    audioPlayer.addEventListener('ended', function() {
        // 可以在这里添加逻辑来播放下一首歌或停止播放
    });

    // 监听搜索框的输入事件
    searchBox.addEventListener('input', filterSongs);

    // 初始化渲染歌曲列表
    renderSongList(songs);
});
