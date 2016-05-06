var URL = window.URL || window.webkitURL;

function $_GET(param) {
    var vars = {};
    window.location.href.replace( location.hash, '' ).replace( 
        /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
        function( m, key, value ) { // callback
            vars[key] = value !== undefined ? value : '';
        }
    );

    if ( param ) {
        return vars[param] ? vars[param] : null;    
    }
    return vars;
}


if (myName == null || myPass == null || otherURI == null) {
    window.location = "start_chat.html";
}

window.onload = function() {
    document.getElementById("your_name").innerHTML = "Your Name: " + myURI;
    document.getElementById("their_name").innerHTML = "Their Name: " + otherURI;
    
    var xhr = new XMLHttpRequest();
    xhr.onload = xhrHandler;
    xhr.open('get', 'https://api.onsip.com/api/?Action=UserRead&Output=json');

    var userPass = myURI + ':' + myPass;//'barnardb@scribe.onsip.com:mother';
    xhr.setRequestHeader('Authorization',
                         'Basic ' + btoa(userPass));
    xhr.send();
}


xhrHandler = function (e) {
        var xhr = e.target;
        var user, credentials;

        if (xhr.status === 200) {
          user = JSON.parse(xhr.responseText).Response.Result.UserRead.User;
          credentials = {
            traceSip: true,
            uri: myURI,
            authorizationUser: user.AuthUsername,
            password: user.Password,
            displayName: user.Contact.Name
          };
        } else {
          alert('Authentication failed!');
          credentials = {};
            window.location = "start_chat.html";
            return;
        }

        window.myUA = new SIP.UA(credentials);
    
        myUA.on('message', function (msg) {
            console.log("reached" +otherURI);
            var msgbody = msg.body;
            msgbody = msgbody.replace("my_results col-md-8 pull-right well", "other_results col-md-8 pull-left well");
            final_transcript += msgbody;
            final_transcript = capitalize(final_transcript);
            final_span.innerHTML = linebreak(final_transcript);
        });
    
    
        // We want to only run the demo if all users for the demo can register
        var numToRegister = 1;
        var numRegistered = 0;
        var registrationFailed = false;
        var markAsRegistered = function () {
            numRegistered += 1;
            if (numRegistered >= numToRegister && !registrationFailed) {
                setupInterfaces();
            }
        };
        var failRegistration = function () {
            registrationFailed = true;
            failInterfaceSetup();
        };

        // Only run the demo if we could register every user agent
        function setupInterfaces() {
            setUpVideoInterface(myUA, otherURI, 'video-of-other', 'my-video-button');
        }
        function failInterfaceSetup() {
            alert('Max registration limit hit. Could not register all user agents, so they cannot communicate. The app is disabled.');
        }

        // We don't want to proceed until we've registered all users.
        // For each registered user, increase the counter.
        myUA.on('registered', markAsRegistered);
        // If any registration fails, then we need to disable the app and tell the
        // user that we could not register them.
        myUA.on('registrationFailed', failRegistration);

        // Unregister the user agents and terminate all active sessions when the
        // window closes or when we navigate away from the page
        window.onunload = function () {
            myUA.stop();
        };
    };

// Function: mediaOptions
//   A shortcut function to construct the media options for an SIP session.
//
// Arguments:
//   audio: whether or not to send audio in a SIP WebRTC session
//   audio: whether or not to send audio in a SIP WebRTC session
//   remoteRender: the video tag to render the callee's remote video in. Can be null
//   localRender: the video tag to render the caller's local video in. Can be null
function mediaOptions(audio, video, remoteRender, localRender) {
    return {
        media: {
            constraints: {
                audio: audio,
                video: video
            },
            render: {
                remote: remoteRender,
                local: localRender
            }
        }
    };
}

// Function: makeCall
//   Makes a call from a user agent to a target URI
//
// Arguments:
//   userAgent: the user agent to make the call from
//   target: the URI to call
//   audio: whether or not to send audio in a SIP WebRTC session
//   audio: whether or not to send audio in a SIP WebRTC session
//   remoteRender: the video tag to render the callee's remote video in. Can be null
//   localRender: the video tag to render the caller's local video in. Can be null
function makeCall(userAgent, target, audio, video, remoteRender, localRender) {
    var options = mediaOptions(audio, video, remoteRender, localRender);
    // makes the call
    var session = userAgent.invite('sip:' + target, options);
    return session;
}

// Function: setUpVideoInterface
//   Sets up the button for a user to manage calling and hanging up
//
// Arguments:
//   userAgent: the user agent the button is associated with
//   target: the target URI that the button calls and hangs up on
//   remoteRenderId: the video tag to render the callee's remote video in.
//                   Can be null
//   buttonId: the id of the button to set up
function setUpVideoInterface(userAgent, target, remoteRenderId, buttonId) {
    // true if the button should initiate a call,
    // false if the button should end a call
    var onCall = false;
    var session;
    var remoteRender = document.getElementById(remoteRenderId);
    var button = document.getElementById(buttonId);

    // Handling invitations to calls.
    // We automatically accept invitations and toggle the button state based on
    // whether we are in a call our not.
    // Also, for each new call session, we need to add an event handler to set
    // the correct button state when we receive a "bye" request.
    userAgent.on('invite', function (incomingSession) {
        onCall = true;
        session = incomingSession;
        var options = mediaOptions(true, true, remoteRender, null);
        button.firstChild.nodeValue = 'hang up';
        remoteRender.style.visibility = 'visible';
        session.accept(options);
        session.on('bye', function () {
            onCall = false;
            button.firstChild.nodeValue = 'call';
            remoteRender.style.visibility = 'hidden';
            session = null;
        });
    });
    // The button either makes a call, creating a session and binding a listener
    // for the "bye" request, or it hangs up a current call.
    button.addEventListener('click', function () {
        // Was on a call, so the button press means we are hanging up
        if (onCall) {
            onCall = false;
            button.firstChild.nodeValue = 'call';
            remoteRender.style.visibility = 'hidden';
            session.bye();
            session = null;
        }
        // Was not on a call, so the button press means we are ringing someone
        else {
            onCall = true;
            button.firstChild.nodeValue = 'hang up';
            remoteRender.style.visibility = 'visible';
            session = makeCall(userAgent, target,
                               true, false,
                               remoteRender, null);
            session.on('bye', function () {
                onCall = false;
                button.firstChild.nodeValue = 'call';
                remoteRender.style.visibility = 'hidden';
                session = null;
            });
        }
    });
}