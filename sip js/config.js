var URL = window.URL || window.webkitURL;

function getCookie(key) {
    var re = new RegExp("(?:(?:^|.*;\s*) ?" + key + "\s*\=\s*([^;]*).*$)|^.*$");
    return document.cookie.replace(re, "$1");

}

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

function setUsers() {
    var person1 = document.getElementById("person1").value;
    var person2 = document.getElementById("person2").value;
    var dataString = "?otherName=" + encodeURIComponent(person1) + "&myName=" + encodeURIComponent(person2);
    var url = window.location.href.split('?')[0];
    window.location.href = url + dataString;
}

// This demo uses unauthenticated users on the "sipjs.onsip.com" demo domain.
// To allow multiple users to run the demo without playing a game of
// chatroulette, we give both callers in the demo a random token and then only
// make calls between users with these token suffixes.
// So, you still might run into a user besides yourself.
function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i)
        result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}
// Each session gets a token that expires 1 day later. This is so we minimize
// the number of users we register for the SIP domain, because SIP hosts
// generally have limits on the number of registered users you may have in total
// or over a period of time.
var token = getCookie('onsipToken');
if (token === '') {
    token = randomString(32, ['0123456789',
                              'abcdefghijklmnopqrstuvwxyz',
                              'ABCDEFGHIJKLMNOPQRSTUVWXYZ'].join(''));
    var d = new Date();
    d.setTime(d.getTime() + 1000*60*60*24); // expires in 1 day
    document.cookie = ('onsipToken=' + token + ';'
                       + 'expires=' + d.toUTCString() + ';');
}
var domain = 'sipjs.onsip.com';

var myName = $_GET('myName');
// TODO: This is to ensure unique username on sipjs free server
myName += "devlab";
var myURI = myName + "@" + domain;

var otherName = $_GET('otherName');
// TODO: This is to ensure unique username on sipjs free server
otherName += "devlab";
var otherURI = otherName + "@" + domain;

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

// Function: createUA
//   creates a user agent with the given arguments plugged into the UA
//   configuration. This is a standard user agent for WebRTC calls.
//   For a user agent for data transfer, see createDataUA
//
// Arguments:
//   callerURI: the URI of the caller, aka, the URI that belongs to this user.
//   displayName: what name we should display the user as
function createUA(callerURI, displayName) {
    var configuration = {
        traceSip: true,
        uri: callerURI,
        displayName: displayName
    };
    var userAgent = new SIP.UA(configuration);
    return userAgent;
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
            button.firstChild.nodeValue = 'video';
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
            button.firstChild.nodeValue = 'video';
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
                               true, true,
                               remoteRender, null);
            session.on('bye', function () {
                onCall = false;
                button.firstChild.nodeValue = 'video';
                remoteRender.style.visibility = 'hidden';
                session = null;
            });
        }
    });
}

// Function: setUpMessageInterface
//   Sets up the chat interface for text messaging
//
// Arguments:
//   userAgent: the local user agent that sends and receives messages
//   target: the target URI that our local user agent communicates with
//   messageRenderId: the ID of where we display sent and received chat messages
//   messageInputId: the ID for the text area that the local user agent types
//                   his or her messages into
//   buttonId: the ID of the button that actually sends the given input message
function setUpMessageInterface(userAgent, target,
                               messageRenderId, messageInputId, buttonId) {
    var messageRender = document.getElementById(messageRenderId);
    var messageInput = document.getElementById(messageInputId);
    var button = document.getElementById(buttonId);

    function sendMessage() {
        var msg = messageInput.value;
        // Only send a message if the message is non-empty
        if (msg !== '') {
            messageInput.value = '';
            userAgent.message(target, msg);
        }
    }

    // We have placeholder text in the message render box. It should be deleted
    // after we have sent or received our first message. This keeps track of
    // that.
    var noMessages = true;

    // Receive a message and put it in the message display div
    userAgent.on('message', function (msg) {
        // If we have not received any messages yet, remove the placeholder
        // text.
        if (noMessages) {
            noMessages = false;
            if (messageRender.childElementCount > 0)
                messageRender.removeChild(messageRender.children[0]);
        }
        var msgTag = createMsgTag(msg.remoteIdentity.displayName, msg.body);
        messageRender.appendChild(msgTag);
    });
    // Cut the content from the input textarea and send it
    button.addEventListener('click', function () {
        sendMessage();
    });
    // Register pressing of the "enter" key while in textarea to send a message.
    // If user presses shift while entering, then add a newline instead.
    messageInput.onkeydown = (function(e) {
        if(e.keyCode == 13 && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
}

// Function: createMsgTag
//   creates the HTML tag and its children for a given message.
//
// Arguments:
//   from: the display name of who the message came from
//   msgBody: the actual body content of the message
function createMsgTag(from, msgBody) {
    var msgTag = document.createElement('p');
    msgTag.className = 'message';
    // Create the "from" section
    var fromTag = document.createElement('span');
    fromTag.className = 'message-from';
    fromTag.appendChild(document.createTextNode(from + ':'));
    // Create the message body
    var msgBodyTag = document.createElement('span');
    msgBodyTag.className = 'message-body';
    msgBodyTag.appendChild(document.createTextNode(' ' + msgBody));
    // Put everything in the message tag
    msgTag.appendChild(fromTag);
    msgTag.appendChild(msgBodyTag);
    return msgTag;
}


(function () {
if (SIP.WebRTC.isSupported()) {
    // Now we do SIP.js stuff
	window.myUA = createUA(myURI, myName); 

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

    // Only run the demo if we could register every user agent
    function setupInterfaces() {
        setUpVideoInterface(myUA, otherURI, 'video-of-other', 'my-video-button');
        //setUpMessageInterface(myUA, otherURI,
        //                      'alice-message-display',
        //                      'alice-message-input',
        //                      'alice-message-button');
    }
    function failInterfaceSetup() {
        alert('Max registration limit hit. Could not register all user agents, so they cannot communicate. The app is disabled.');
    }
}
})();