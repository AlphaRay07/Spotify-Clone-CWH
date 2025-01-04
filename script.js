document.addEventListener("DOMContentLoaded", () => {
    
    const butt= document.querySelectorAll(".play-button")
    const playlist= document.querySelectorAll(".playlist")
    let playpause= document.querySelector("#playing")
    let outofvarname= document.querySelectorAll(".song")
    let lis= document.getElementsByTagName("li")
    let libbi= document.getElementById("list")
    let paused = false
    let time= document.querySelector(".duration")
    let audio;
    let dir= document.querySelector(".dir")
    let playbar= document.querySelector(".playbar")
    let songs= []
    let sos= []
    
    durConvert= e => {
        min= Math.floor(e / 60)
        sec= Math.trunc(e%60, 2).toString().padStart(2, '0')
    
        return `${min}:${sec}`
    }
    
    playlist.forEach((element, index) => {
        element.addEventListener("mouseover", () => {
            butt[index].classList.add("in")
        })
    
        butt[index].addEventListener("mouseover", () => {
            butt[index].classList.add("in")
        })
        
        butt[index].addEventListener("mouseleave", () => {
            butt[index].classList.remove("in")
        })
        
        element.addEventListener("mouseleave", () => {
            butt[index].classList.remove("in")
        })

        butt[index].addEventListener("click", () => {musicPlay(index)})
    })

    
    playlist.forEach((element, index) => {
    })
    
    async function musicPlay(folder){
        let a= await fetch(`http://127.0.0.1:5500/songs/`)
        let response= await a.text()
        let div= document.createElement("div")
        div.innerHTML = response; 
        let ancs= div.getElementsByTagName("a")
        let song=[]
        // console.log(ancs)
        for (let i = 0; i < ancs.length; i++) {
            let element = ancs[i];
            if (element.href.endsWith(".mp3")) {
                // s= element.href.replaceAll("http://127.0.0.1:5500/songs/", " ")
                // x= s.replaceAll("%20", " ")
                // console.log(x)
                song.push(element.href);
            }
        }
        console.log(song)
        return song
    }
    
    function player(index){
        // audio.stop()
        audio= new Audio(songs[index])
        audio.play()
    
        timeBar= () => {
            time.textContent= `${(durConvert(audio.currentTime))} / ${durConvert(audio.duration)}`
        }
        
        if(playpause.alt== "sed"){    
            playpause.src = "./svgs/pausebutton.svg"
            paused= false
        }
        setInterval(timeBar, 1000)
        setInterval(bar, 1000)
        document.querySelector(".details").textContent= names(index)
        console.log(names())
    }
    
    pauseplay= () => {
        if(paused){
            // audio= new Audio(songs[index])
            audio.pause()
        }
        else{
            audio.play()
        }
    }
    
    playpause.addEventListener("click", () => {
        if(!paused){
            playpause.src= "./svgs/playbutton.svg"
            paused=true
            pauseplay()
        }
        else if(paused){
            paused= false;
            pauseplay()
            playpause.src= "./svgs/pausebutton.svg"
            console.log('sosedks')
        }
    })
    
    async function libSongs(songs){
        let names=[]
        
        const library= document.getElementById("list")
        songs.forEach(element => {
            s= element.replaceAll("http://127.0.0.1:5500/songs/", " ")
            x= s.replaceAll("%20", " ")
            intermediate= x.replaceAll(".mp3", "")
            song= intermediate.split(" - ")
            names.push(song)
        })
        console.log(names)
        return names
    }
    
    async function display(){
        sos= await libSongs(songs)
        console.log(sos)
        sos.forEach(element => {
            li= document.createElement("li")
            li.textContent= element
            libbi.innerHTML= libbi.innerHTML + `<li><div class="song"><img src="music.svg" alt=""> ${element[0]}</div><span class="artist">${element[1]}</span></li>` 
        })
        outofvarname= document.querySelectorAll(".song")
        ok()
    }
    async function final(){
        songs = await musicPlay()
        display()
    }
    
    
    
    final()
    console.log(songs)
    
    function ok(){
        outofvarname.forEach((element,index) => {
            element.addEventListener("click", () => {
                player(index)
            })
        })
    }
    
    bar= () => {
        per= (audio.currentTime/audio.duration)*100
        dir.style.left= `${per}%`
    }
    
    // playbar.addEventListener("t")
    
    names= index => {
        artist= sos[index][1]
        naam= sos[index][0]
        console.log(sos[index])
        return `${artist} - ${naam}`
    }
    
});    


