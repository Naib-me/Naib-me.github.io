document.addEventListener('DOMContentLoaded', function() {
    const musicData = [
        { id: 1, name: 'Imagine', artist: 'John Lennon', url: 'path/to/Imagine.mp3' },
        { id: 2, name: 'Bohemian Rhapsody', artist: 'Queen', url: 'path/to/BohemianRhapsody.mp3' },
        { id: 3, name: 'Stairway to Heaven', artist: 'Led Zeppelin', url: 'path/to/StairwayToHeaven.mp3' },
        // 更多音乐数据...
    ];

    const musicListElement = document.getElementById('musicList');
    const searchBox = document.getElementById('searchBox');
    const audioPlayer = document.getElementById('audioPlayer');
    const audioSource = document.getElementById('audioSource');

    function displayMusicList(musicArray) {
        musicListElement.innerHTML = '';
        musicArray.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('music-item');
            itemElement.textContent = `${item.name} - ${item.artist}`;
            itemElement.addEventListener('click', function() {
                audioSource.src = item.url; // 设置音乐的URL
                audioPlayer.load(); // 加载音乐
                audioPlayer.play(); // 播放音乐
            });
            musicListElement.appendChild(itemElement);
        });
    }

    function filterMusic(searchTerm) {
        return musicData.filter(item => {
            return item.name.toLowerCase().includes(searchTerm.toLowerCase());
        });
    }

    displayMusicList(musicData);

    searchBox.addEventListener('input', function() {
        const filteredMusic = filterMusic(searchBox.value);
        displayMusicList(filteredMusic);
    });
});