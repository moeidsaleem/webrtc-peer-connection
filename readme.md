# Project - WebRTC Peer connection 2020 


## Tools 
- Node.js 
- Rtcpeerconnection



## RTC 

Webrtc consist of 3 main tasks 
1. Getting a Stream ( getUserMedia )
2. Communicating stream ( RTCPeerConnection )
3. Sending arbitrary data ( RTCDataChannel )


### Media Stream
- Respresents a stream of audio /video. 
 - Media stream consist of MediaSteramTrack that can be a video or an audio. 
- Media Stream can contain multiple tracks. 
- Obtain a Media Stream with **navigator.getUserMedia()**

```
let constraints = {video:true};

function successCallback(stream) {
    let video = document.querySelector("video");
    video.src = window.URL.createObjectURL(stream);
};

function errorCallback(error) {
    console.log(`Navigator.getUserMedia Error: ${error} `)
};

navigator.getUserMedia(constraints, successCallback, errorCallback);

```
#### Constraints 
- Controls the content of the MediaStream
- MediaType, Resolution, Framerate 

``` 
video:{
    mandatory:{
        minWidth:640,
        minHeight:360
    }
},
optional:[{
    minWidth:1280,
    minHeight:720
}]
```
#### Web Audio
Getting getUserMedia from our microphone is also possible directly for web audio. 
```
function gotStream(stream) {
    let audioCOnext = new webkiAudioContext();

    // Create AudioNode from stream 
    let mediaStreamSource = audioContext.createMediaStreamSource(stream);

    //Connect to destination or any other node for processing! 
    mediaStreamSource.connect(audioContext.destination);
}

navigator.webkitGetUserMedia({audio:true}, gotStream)
```

#### Screen Capture 
In order to capture screen need to specifiy it in the constraints. 
```
let constraints = {
    video: {
        mandatory: {
            chromeMediaSource: 'screen'
        }
    }
};

navigator.webkitGetUserMedia(constraints, gotStream);
```

### RTCPeerConnection 
Audio video communication between peers.  After we have established the connection and then we plug our media stream into the connection and send them to the other side. 

```
pc = new RTCPeerConnection(null);
pc.onaddstream = gotRemoteStream;
pc.addStream(localStream);
pc.createOffer(gotOffer);

function gotOffer(desc) {
    pc.setLocalDescription(desc);
    sendOffer(desc);
}

function gotAnswer(desc) {
    pc.setRemoteDescription(desc);
}

function gotRemoteSession(e) {
    attachMediaStream(remoteVideo, e.stream);
}


```


### RTC Data Channels 



### Servers and Protocols 

#### Signaling Server 
- Exchanges 'Session Description'
- - What formats i support what format i want to send
- - Network Information For peer-to-peer setup
- Can use any messaging mechanism. 
- Can use any messaging protocol.
  
#### STUN
Basically we have NAT which assigns a public IP and to know what is our network information / public IP we use STUN server. 
This is a peer-to-peer works and its usually works. However, in some cases it fails.

- Tell what is my Public IP Address 
- Simple server, cheap to run 
- Data flows peer-to-peer
- 
#### TURN 
TURN in simple term is a cloud fallback relay server when peer-to-peer is not possible. It always work but has a cost to it. 

- Provide a cloud fallback if peer-to-peer communication fails. 
- Data is sent through server, uses server bandwidth. 
- Ensure the call works in almost all environment. 

#### ICE 
On one hand we have STUN which is super cheap and TURN that always works but is costly, in order to make them work simultaneously in an environment we have ICE server which manages both STUN / TURN actions. 
- A framework for connecting peers.
- Tries to find the best path for each call.
- Vast Majority of cost can use STUN.

### Deploying STUN / TURN 
- stun.l.google.com:1902 ( testing STUN server by google)
-  WebRTC stunserver, turnserver
-  rfc5766-turn-server ( RECOMMENDED by google = can easily get images from google )
- restund



## Architecture 

### 1. Peer to Peer:one-to-one call 
### 2. MESH: small N-way call (limited conference call - upto 4 people )
### 3. STAR: medium N-way call ( FOCUS Protocol - 6 People - support limited capability )
### 4. MCU: large N-way call ( RECOMMENDED - Multi-point Control Unit - Audio Video data mix / recording  )


### Phones and more - Talk to other devices 
Easily to inter-operate with non-broswer devices 
- **sipML5** - opensource Javascript SIP Client 
- **Phono** - opensource Javascript Phone API 
- **Zingaya** - embeddable phone widget 

#### Zingaya - Telephony 
No plugin. Real time calling integration. 

#### Tethr - Disaster communication - If no internet 
If there is no internet infrastructure then tethr provides a huge support for in network calls. 


## Resouces 

WebRTC internals - chrome://webrtc-internals ( shows grade statistics, hack and loss, bandwidth, video resolution, sizes and info regarding logs using API, etc / Customer reporting info with call get debugging info )

### Adapter.js
For different browser webRTC might not be able to communicate with others. AdapterJS ensures that browser uses the latest API. 
For chrome/firefox/opera etc different broswer calling. 


### WebRTC Libraries 
- SimpleWebRTC 

### Servuces 
opentok has network deployed all over the network and can be used for quick up and running with webRTC. 
- opentok 
- vLine 




## Other Information - 2020 update

Oftentime these servers are packed into one solution.

Minimum requirements of server for WEBRTC 
- Signaling server 
- STUN/TURN server 


### TIPs

- If you dont want to pay for STUN server, you can use google STUN server.
- Try to determine the exact arachitecture required before proceeding. 
- Websockets is the most common method for signaling but you can use other cloud altenratives i.e. Firebase 
- If you are deploying your own STUN/TURN server, do not deploy without a TURN server.
- Media server is only required for large multi-party (conference) calling, recording, advance use cases.
- SFU / Simulcast is state of the art media server.
- Gateway - mostly needed for connecting to SIP or legacy telcom network. 








## Installation

``` npm start  ```



#### Creating a SSL Certificate 
openssl req -x509 -sha256 -nodes -newkey rsa:2048 -days 365 -keyout localhost.key -out localhost.crt

## Contribution

@moeidsaleem 
www.moeidsaleem.com 
moeidsaleem@gmail.com 
