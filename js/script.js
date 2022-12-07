window.onload = () => {
    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    const splitTime = (sec) => {
        if (sec % 60 >= 0 && sec % 60 < 10) return `${Math.floor(sec / 60)}:0${Math.floor(sec % 60)}`
        else return `${Math.floor(sec / 60)}:${Math.floor(sec % 60)}`
    }
    let audioElemnt = document.getElementById("audioElemnt")
    let btnPlay = document.getElementById("btnPlay")
    let current = document.getElementById("current")
    let duration = document.getElementById("duration")
    let currentVolume = document.getElementById("currentVolume")
    let currentPosition = document.getElementById("currentPosition")
    let iconMenu = document.querySelectorAll(".iconMenu")
    let volumeMax = document.getElementById("volumeMax")
    let nextBtn = document.getElementById("nextBtn")
    let prevBtn = document.getElementById("prevBtn")
    let compositor = document.getElementById("compositor")
    let nameMusic = document.getElementById("nameMusic")
    let menuBarr = document.getElementById("menuBarr")
    let tableGroup = document.getElementById("tableGroup")
    let spanPlay = document.getElementById("spanPlay")
    let volumeRelative = document.getElementById("volumeRelative")
    let imageChange = document.getElementById("imageChange")
    let tableMusicGroup = document.getElementById("tableMusicGroup")
    let favor = document.getElementById("favor")
    let trackId = 0
    let concat
    let arrBlocks = localStorage.getItem("favorite")
    let intervalId, random, arr = []
    if (JSON.parse(arrBlocks) != null) arr = JSON.parse(arrBlocks)
    let musicAll = [
        ["Pitbull & Zac Brown", "Can't Stop Us Now (Nitti Gritti Remix)", "Pitbull & Zac Brown - Can't Stop Us Now (Nitti Gritti Remix).mp3", "maxresdefault.jpg"],
        ["Imagine Dragons", "Bones", "Imagine Dragons - Bones.mp3", "Imagine Dragons - Bones.jpg"],
        ["Lil Nas X", "Old Town Road", "Lil Nas X - Old Town Road.mp3", "5q1jxdwpsow21.webp"],
        ["Havana feat. Yaar", "I Lost You", "Havana feat. Yaar - I Lost You.mp3", "Havana feat. Yaar - I Lost You.jpg"],
        ["Lewis Capaldi", "Someone You Loved", "Lewis Capaldi - Someone You Loved.mp3", "vluawm7glc6ra_600.jpg"],
        ["SAINt JHN Imanbek", "Roses", "SAINt JHN Imanbek - Roses.mp3", "SAINt JHN Imanbek - Roses.jfif"],
        ["Brennan savage", "love me or hate me", "Brennan savage - love me or hate me.mp3", "Brennan savage - love me or hate me.jpg"],
        ["The Neighbourhood", "Afraid", "The Neighbourhood - Afraid.mp3", "The Neighbourhood - Afraid.jpg"],
        ["Mishlawi", "All night", "Mishlawi - All night.mp3", "Mishlawi - All night.jfif"],
        ["Arnon feat. Killua", "Te Molla", "Arnon feat. Killua - Te Molla.mp3", "Arnon feat. Killua - Te Molla.jpg"],
        ["Alyosha", "Калина", "Alyosha - Калина.mp3", "Alosha.jpg"],
        ["Maroon 5", "Memories", "Maroon 5 - Memories.mp3", "Maroon 5 - Memories.jfif"]
    ]

    let num = 1
    for (let tableMusic of musicAll) {
        let tr = document.createElement("tr")
        let td = document.createElement("td")
        let tdSpan = document.createElement("td")
        let tdText = document.createElement("td")
        let span = document.createElement("span")
        tableGroup.appendChild(tr)
        tr.appendChild(td)
        td.setAttribute("class", "hoverColor")
        td.innerHTML = num++
        let arrr = [tableMusic[0], tableMusic[1]]
        arrr = arrr.join(" - ")
        tr.appendChild(tdText)
        tdText.setAttribute("class", "groupMusic")
        tdText.innerText = arrr
        tr.appendChild(tdSpan)
        tdSpan.appendChild(span)
        span.setAttribute("class", "material-icons fzise favorLike")
        span.innerText = "favorite"
    }
    menuBarr.onclick = () => {
        menuBarr.classList.toggle("active")
        if (menuBarr.classList.contains("active") == true) {
            spanPlay.classList.add("active")
            volumeRelative.classList.add("active")
        } else {
            spanPlay.classList.remove("active")
            volumeRelative.classList.remove("active")
        }
        tableMusicGroup.classList.toggle("active")
    }
    compositor.innerText = musicAll[trackId][0]
    nameMusic.innerText = musicAll[trackId][1]
    audioElemnt.src = `./audio/${musicAll[trackId][2]}`
    imageChange.src = `./imgAudio/${musicAll[trackId][3]}`
    let groupMusics = document.querySelectorAll(".groupMusic")
    groupMusics[0].classList.add("active")
    groupMusics.forEach((el, id) => {
        el.addEventListener("click", () => {
            trackId = id
            clearActiveMusic()
            el.classList.add("active")
            audioElemnt.src = `./audio/${musicAll[trackId][2]}`
            audioElemnt.autoplay = true
            btnPlay.innerText = "pause"
            compositor.innerText = musicAll[trackId][0]
            nameMusic.innerText = musicAll[trackId][1]
            favorites()
            playInterval()
        })
    })
    function clearActiveMusic() {
        for (let item of groupMusics) {
            item.classList.remove("active")
        }
    }
    function idObject() {
        clearActiveMusic()
        groupMusics[trackId].classList.add("active")
    }
    function nextMusic() {
        if (random == true) {
            trackId = getRandomIntInclusive(0, musicAll.length - 1)
        } else trackId++
        if (trackId > musicAll.length - 1) {
            trackId = 0
        }
        compositor.innerText = musicAll[trackId][0]
        nameMusic.innerText = musicAll[trackId][1]
        audioElemnt.autoplay = true
        audioElemnt.src = `./audio/${musicAll[trackId][2]}`
        checkCurrentTime()
        btnPlay.innerText = "pause"
        idObject()
    }
    nextBtn.onclick = () => {
        nextMusic()
        playInterval()
        favorites()
    }
    function favorites() {
        concat = musicAll[trackId][0] + " - " + musicAll[trackId][1]
        favor.classList.remove("active")
        for (let item of arr) {
            if (concat == item) favor.classList.add("active")
        }
    }
    favorites()
    prevBtn.onclick = () => {
        if (random == true) {
            trackId = getRandomIntInclusive(0, musicAll.length - 1)
        } else trackId--
        if (trackId < 0) {
            trackId = musicAll.length - 1;
        }
        compositor.innerText = musicAll[trackId][0]
        nameMusic.innerText = musicAll[trackId][1]
        favorites()
        audioElemnt.autoplay = true
        audioElemnt.src = `./audio/${musicAll[trackId][2]}`
        checkCurrentTime()
        btnPlay.innerText = "pause"
        idObject()
        playInterval()
    }
    current.innerText = splitTime(currentPosition.value)
    audioElemnt.volume = 1
    currentVolume.value = audioElemnt.volume
    let copySum = audioElemnt.volume
    currentVolume.oninput = () => {
        audioElemnt.volume = currentVolume.value
        copySum = audioElemnt.volume
        audioElemnt.muted = false
        let res = Math.trunc(currentVolume.value * 100)
        if (res > 50) {
            volumeMax.innerText = "volume_up"
        }
        if (res < 50 && res > 0) {
            volumeMax.classList.remove("active")
            volumeMax.innerText = "volume_down"
        }
        if (res <= 0) {
            volumeMax.classList.add("active")
            volumeMax.innerText = "volume_off"
        }
    }

    currentPosition.oninput = () => {
        audioElemnt.currentTime = currentPosition.value
    }
    function playInterval() {
        imageChange.src = `./imgAudio/${musicAll[trackId][3]}`
        if (audioElemnt.paused) {
            audioElemnt.play(2)
            intervalId = setInterval(() => {
                current.innerText = splitTime(audioElemnt.currentTime)
                currentPosition.value = audioElemnt.currentTime
                if (audioElemnt.ended == true) {
                    nextMusic()
                    favorites()
                }
            }, 1000);
            btnPlay.innerText = "pause"

        } else {
            audioElemnt.pause()
            clearInterval(intervalId)
            btnPlay.innerText = "play_arrow"
        }
    }
    btnPlay.onclick = () => {
        playInterval()
    }

    function checkCurrentTime() {
        if (audioElemnt.duration) {
            doSomething();
        } else {
            audioElemnt.onloadedmetadata = doSomething;
        }
    }
    checkCurrentTime()
    function doSomething() {
        duration.innerText = splitTime(audioElemnt.duration)
        currentPosition.min = 0
        currentPosition.max = audioElemnt.duration
    }
    function checkFavor(el, trackId) {
        if (el.classList.contains("active")) {
            arr.push(musicAll[trackId][0] + " - " + musicAll[trackId][1])
            localStorage.setItem("favorite", JSON.stringify(arr))
        }
        if (!el.classList.contains("active")) {
            let index = arr.indexOf(musicAll[trackId][0] + " - " + musicAll[trackId][1])
            arr.splice(index, 1)
            localStorage.setItem("favorite", JSON.stringify(arr))
        }
    }
    iconMenu.forEach((el, id) => {
        el.addEventListener("click", () => {
            switch (id) {
                case 0:
                    el.classList.toggle("active")
                    checkFavor(el, trackId)
                    checkLibFavor()
                    if (el.classList.contains("active") == false) {
                        let favorLike = document.querySelectorAll('.favorLike')
                        favorLike[trackId].classList.remove('active')
                    }
                    break
                case 1:
                    let res = el.classList.toggle("active")
                    if (res == true) {
                        audioElemnt.loop = true
                    }
                    if (res == false) {
                        audioElemnt.loop = false
                    }
                    break
                case 2:
                    el.classList.toggle("active")
                    if (el.classList.contains("active") == true)
                        random = true
                    else random = false
                    break
                case 3:
                    let resMut = el.classList.toggle("active")
                    let sum = Math.trunc(currentVolume.value * 100)
                    if (resMut == true) {
                        audioElemnt.volume = 0
                        currentVolume.value = 0
                        sum = 0
                        volumeMax.innerText = "volume_off"
                        audioElemnt.muted = true
                    }
                    if (resMut == false) {
                        sum = Math.trunc(copySum * 100)
                        audioElemnt.volume = copySum
                        currentVolume.value = copySum
                        if (sum > 50) {
                            volumeMax.innerText = "volume_up"
                        }
                        if (sum < 50 && sum > 0) {
                            volumeMax.innerText = "volume_down"
                        }
                        if (sum <= 0) {
                            volumeMax.innerText = "volume_off"
                        }
                        audioElemnt.muted = false
                    }
                    break
            }
        })
    })
    function checkLibFavor() {
        let favorLike = document.querySelectorAll('.favorLike')
        favorLike.forEach((el, id) => {
            concat = musicAll[id][0] + " - " + musicAll[id][1]
            for (let item of arr) {
                if (concat == item) el.classList.add("active")
            }
            el.addEventListener('click', () => {
                el.classList.toggle("active")
                checkFavor(el, id)
                console.log(musicAll[id][0] + ' - ' + musicAll[id][1] == musicAll[trackId][0] + ' - ' + musicAll[trackId][1])
                if (musicAll[id][0] + ' - ' + musicAll[id][1] == musicAll[trackId][0] + ' - ' + musicAll[trackId][1]) favor.classList.add("active")
                if (musicAll[id][0] + ' - ' + musicAll[id][1] == musicAll[trackId][0] + ' - ' + musicAll[trackId][1]) {
                    if (el.classList.contains("active") == false)
                        favor.classList.remove("active")
                }
                
            })
        })
    }
    checkLibFavor()
}