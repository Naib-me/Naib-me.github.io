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
        { title: "如何", artist: "福禄寿FloruitShow", src: "https://zwzzv-my.sharepoint.com/personal/evanwu_zwzzv_onmicrosoft_com/_layouts/15/download.aspx?UniqueId=754dd5ce-4195-4bfc-8b20-d2799e3ddbd5&Translate=false&tempauth=v1.eyJzaXRlaWQiOiJkNTA0MDE2ZS1iNWQ5LTRkOTUtYTMyZC1jZjc3YzBiM2YwNjMiLCJhcHBfZGlzcGxheW5hbWUiOiJDbG91ZHJldmUiLCJhcHBpZCI6IjdhZWIwZGQ1LWNlMmItNGZiNS1iMGZkLWI3MGIxYjU3MjUyZCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC96d3p6di1teS5zaGFyZXBvaW50LmNvbUA1NjZlYTI3OS0xNDEzLTQwYWMtODVhNi05M2E0ZDliODUxZmQiLCJleHAiOiIxNzIyNTc1MzM5In0.CgoKBHNuaWQSAjY0EgsIjJzO59usmT0QBRoOMjAuMTkwLjE0NC4xNzEqLFpRbU5UVERkT0Zkdy9qMzI4VU5IZDJGVnhBRTI2dXdZSkwyT0lWcnB2ZjA9MJ0BOAFCEKFCNzqhEAAwkHONJnZA3hRKEGhhc2hlZHByb29mdG9rZW5SCFsia21zaSJdcikwaC5mfG1lbWJlcnNoaXB8MTAwMzIwMDFmNjU0OThjMUBsaXZlLmNvbXoBMoIBEgl5om5WExSsQBGFppOk2bhR_ZIBBumcgeaitZoBA-WQtKIBHGV2YW53dUB6d3p6di5vbm1pY3Jvc29mdC5jb22qARAxMDAzMjAwMUY2NTQ5OEMxsgEOYWxsZmlsZXMud3JpdGXIAQE.INOGyvDN_GbqKORGCoycpmBF04-f8PYO8GMWM2ZicpA&ApiVersion=2.0" },
        { title: "III", artist: "Athletics", src: "https://zwzzv-my.sharepoint.com/personal/evanwu_zwzzv_onmicrosoft_com/_layouts/15/download.aspx?UniqueId=747ddd4b-0486-4850-8ff8-b3a19eec0578&Translate=false&tempauth=v1.eyJzaXRlaWQiOiJkNTA0MDE2ZS1iNWQ5LTRkOTUtYTMyZC1jZjc3YzBiM2YwNjMiLCJhcHBfZGlzcGxheW5hbWUiOiJDbG91ZHJldmUiLCJhcHBpZCI6IjdhZWIwZGQ1LWNlMmItNGZiNS1iMGZkLWI3MGIxYjU3MjUyZCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC96d3p6di1teS5zaGFyZXBvaW50LmNvbUA1NjZlYTI3OS0xNDEzLTQwYWMtODVhNi05M2E0ZDliODUxZmQiLCJleHAiOiIxNzIyNTc1ODE3In0.CgoKBHNuaWQSAjY0EgsI7uvgtf-smT0QBRoOMjAuMTkwLjE0NC4xNjkqLHQzZDRqb1FTTFdwZndqd0NpMFRuNEMwRHFpRDdNeURmcjkwcTYxdlFmRFk9MJ0BOAFCEKFCN69OcAAwkHODacZrsXJKEGhhc2hlZHByb29mdG9rZW5SCFsia21zaSJdcikwaC5mfG1lbWJlcnNoaXB8MTAwMzIwMDFmNjU0OThjMUBsaXZlLmNvbXoBMoIBEgl5om5WExSsQBGFppOk2bhR_ZIBBumcgeaitZoBA-WQtKIBHGV2YW53dUB6d3p6di5vbm1pY3Jvc29mdC5jb22qARAxMDAzMjAwMUY2NTQ5OEMxsgEOYWxsZmlsZXMud3JpdGXIAQE.JzXn1EoyJgvESUI2DjK5NdABJ5tr4LaZ4TTmAVZHRqg&ApiVersion=2.0"},
        { title: "I", artist: "Athletics", src: "https://zwzzv-my.sharepoint.com/personal/evanwu_zwzzv_onmicrosoft_com/_layouts/15/download.aspx?UniqueId=fd53d587-6f0e-4c57-b7f0-169a3422272a&Translate=false&tempauth=v1.eyJzaXRlaWQiOiJkNTA0MDE2ZS1iNWQ5LTRkOTUtYTMyZC1jZjc3YzBiM2YwNjMiLCJhcHBfZGlzcGxheW5hbWUiOiJDbG91ZHJldmUiLCJhcHBpZCI6IjdhZWIwZGQ1LWNlMmItNGZiNS1iMGZkLWI3MGIxYjU3MjUyZCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC96d3p6di1teS5zaGFyZXBvaW50LmNvbUA1NjZlYTI3OS0xNDEzLTQwYWMtODVhNi05M2E0ZDliODUxZmQiLCJleHAiOiIxNzIyNTc3MjY2In0.CgoKBHNuaWQSAjY0EgsIiOy6ruutmT0QBRoOMjAuMTkwLjE0NC4xNzAqLG1HRGtrSEM2NjNpWkg3eGwvSTZncjBuRkN4TlhnRDBYOEpUWmhFdGo1RE09MJ0BOAFCEKFCOREHgAAwkHOKsP7JMshKEGhhc2hlZHByb29mdG9rZW5SCFsia21zaSJdcikwaC5mfG1lbWJlcnNoaXB8MTAwMzIwMDFmNjU0OThjMUBsaXZlLmNvbXoBMoIBEgl5om5WExSsQBGFppOk2bhR_ZIBBumcgeaitZoBA-WQtKIBHGV2YW53dUB6d3p6di5vbm1pY3Jvc29mdC5jb22qARAxMDAzMjAwMUY2NTQ5OEMxsgEOYWxsZmlsZXMud3JpdGXIAQE.cHizLhh6ej5cnhgtzeEXkanBRVLONnUVG8gd2RFX2FY&ApiVersion=2.0"},
        //{title: "", artist: "",src: ""},
        {title: "II", artist: "Athletics",src: "https://zwzzv-my.sharepoint.com/personal/evanwu_zwzzv_onmicrosoft_com/_layouts/15/download.aspx?UniqueId=5c521c84-a377-4d87-ba60-36aaf9f1b0f8&Translate=false&tempauth=v1.eyJzaXRlaWQiOiJkNTA0MDE2ZS1iNWQ5LTRkOTUtYTMyZC1jZjc3YzBiM2YwNjMiLCJhcHBfZGlzcGxheW5hbWUiOiJDbG91ZHJldmUiLCJhcHBpZCI6IjdhZWIwZGQ1LWNlMmItNGZiNS1iMGZkLWI3MGIxYjU3MjUyZCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC96d3p6di1teS5zaGFyZXBvaW50LmNvbUA1NjZlYTI3OS0xNDEzLTQwYWMtODVhNi05M2E0ZDliODUxZmQiLCJleHAiOiIxNzIyNTc3NDA3In0.CgoKBHNuaWQSAjY0EgsIwq-B6_WtmT0QBRoOMjAuMTkwLjE0NC4xNzAqLE9ZbFpWYVBsZFFZejBmenBtVi92WjA4ZnZ6dEphTG1lMnduY2FRSGVOL0k9MJ0BOAFCEKFCOTNY8AAwoL420tbCnLxKEGhhc2hlZHByb29mdG9rZW5SCFsia21zaSJdcikwaC5mfG1lbWJlcnNoaXB8MTAwMzIwMDFmNjU0OThjMUBsaXZlLmNvbXoBMoIBEgl5om5WExSsQBGFppOk2bhR_ZIBBumcgeaitZoBA-WQtKIBHGV2YW53dUB6d3p6di5vbm1pY3Jvc29mdC5jb22qARAxMDAzMjAwMUY2NTQ5OEMxsgEOYWxsZmlsZXMud3JpdGXIAQE.zAaOK7mczx7KU12BzV0ZqEZXc_rylYHmhIY_HfEhAw4&ApiVersion=2.0"},
        {title: "IV", artist: "Athletics",src: "https://zwzzv-my.sharepoint.com/personal/evanwu_zwzzv_onmicrosoft_com/_layouts/15/download.aspx?UniqueId=2326d8a9-1dd7-491d-9690-41c203e0b92f&Translate=false&tempauth=v1.eyJzaXRlaWQiOiJkNTA0MDE2ZS1iNWQ5LTRkOTUtYTMyZC1jZjc3YzBiM2YwNjMiLCJhcHBfZGlzcGxheW5hbWUiOiJDbG91ZHJldmUiLCJhcHBpZCI6IjdhZWIwZGQ1LWNlMmItNGZiNS1iMGZkLWI3MGIxYjU3MjUyZCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC96d3p6di1teS5zaGFyZXBvaW50LmNvbUA1NjZlYTI3OS0xNDEzLTQwYWMtODVhNi05M2E0ZDliODUxZmQiLCJleHAiOiIxNzIyNTc3ODIzIn0.CgoKBHNuaWQSAjY0EgsI3uWn8ZSumT0QBRoOMjAuMTkwLjE0NC4xNjkqLHNScTMxNGxhSUdmZ3lhL3c4L3JPZnV0eUpzc1hEQzBCeTlaa1d3NTRxVDQ9MJ0BOAFCEKFCOZkV4AAwkHODId-GEZNKEGhhc2hlZHByb29mdG9rZW5SCFsia21zaSJdcikwaC5mfG1lbWJlcnNoaXB8MTAwMzIwMDFmNjU0OThjMUBsaXZlLmNvbXoBMoIBEgl5om5WExSsQBGFppOk2bhR_ZIBBumcgeaitZoBA-WQtKIBHGV2YW53dUB6d3p6di5vbm1pY3Jvc29mdC5jb22qARAxMDAzMjAwMUY2NTQ5OEMxsgEOYWxsZmlsZXMud3JpdGXIAQE.Zv0v_-UzD6N9cRDUjgaqOJ2Brh-oqUue_38XXuQAI9E&ApiVersion=2.0"},
        {title: "V", artist: "Athletics",src: "https://zwzzv-my.sharepoint.com/personal/evanwu_zwzzv_onmicrosoft_com/_layouts/15/download.aspx?UniqueId=609ff6b5-9d26-4d5f-9096-5057695732cc&Translate=false&tempauth=v1.eyJzaXRlaWQiOiJkNTA0MDE2ZS1iNWQ5LTRkOTUtYTMyZC1jZjc3YzBiM2YwNjMiLCJhcHBfZGlzcGxheW5hbWUiOiJDbG91ZHJldmUiLCJhcHBpZCI6IjdhZWIwZGQ1LWNlMmItNGZiNS1iMGZkLWI3MGIxYjU3MjUyZCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC96d3p6di1teS5zaGFyZXBvaW50LmNvbUA1NjZlYTI3OS0xNDEzLTQwYWMtODVhNi05M2E0ZDliODUxZmQiLCJleHAiOiIxNzIyNTc3OTE1In0.CgoKBHNuaWQSAjY0EgsIgOD62JuumT0QBRoOMjAuMTkwLjE0NC4xNjkqLGJmK0c4TG43TWRPa2JkUmtMTGRUWHRVTVZiTWIvZHZPMTBMbUNVUDloV1E9MJ0BOAFCEKFCOa9nUAAwkHOESmV_LBNKEGhhc2hlZHByb29mdG9rZW5SCFsia21zaSJdcikwaC5mfG1lbWJlcnNoaXB8MTAwMzIwMDFmNjU0OThjMUBsaXZlLmNvbXoBMoIBEgl5om5WExSsQBGFppOk2bhR_ZIBBumcgeaitZoBA-WQtKIBHGV2YW53dUB6d3p6di5vbm1pY3Jvc29mdC5jb22qARAxMDAzMjAwMUY2NTQ5OEMxsgEOYWxsZmlsZXMud3JpdGXIAQE.Zl1ePfyCXKat8v2KH7fxGgssC2oDwMUE9X_HmqAGZ_8&ApiVersion=2.0"},
        {title: "VI", artist: "Athletics",src: "https://zwzzv-my.sharepoint.com/personal/evanwu_zwzzv_onmicrosoft_com/_layouts/15/download.aspx?UniqueId=d2e77284-34cf-4167-96af-843b958db763&Translate=false&tempauth=v1.eyJzaXRlaWQiOiJkNTA0MDE2ZS1iNWQ5LTRkOTUtYTMyZC1jZjc3YzBiM2YwNjMiLCJhcHBfZGlzcGxheW5hbWUiOiJDbG91ZHJldmUiLCJhcHBpZCI6IjdhZWIwZGQ1LWNlMmItNGZiNS1iMGZkLWI3MGIxYjU3MjUyZCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC96d3p6di1teS5zaGFyZXBvaW50LmNvbUA1NjZlYTI3OS0xNDEzLTQwYWMtODVhNi05M2E0ZDliODUxZmQiLCJleHAiOiIxNzIyNTc4MTE4In0.CgoKBHNuaWQSAjY0EgsI9t7M56qumT0QBRoOMjAuMTkwLjE0NC4xNjkqLEdDUi9xOVNKbTQ3YkxmK1VnVlQ4MjhKWEZ0dlduQk9JUHFpL2xkTFpENDA9MJ0BOAFCEKFCOeDtMAAwoL4-W8Olp6BKEGhhc2hlZHByb29mdG9rZW5SCFsia21zaSJdcikwaC5mfG1lbWJlcnNoaXB8MTAwMzIwMDFmNjU0OThjMUBsaXZlLmNvbXoBMoIBEgl5om5WExSsQBGFppOk2bhR_ZIBBumcgeaitZoBA-WQtKIBHGV2YW53dUB6d3p6di5vbm1pY3Jvc29mdC5jb22qARAxMDAzMjAwMUY2NTQ5OEMxsgEOYWxsZmlsZXMud3JpdGXIAQE.s4acMd-zgQHXz6_IyyV60ejydqjAewNVX8i7xVz2wrg&ApiVersion=2.0"},
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