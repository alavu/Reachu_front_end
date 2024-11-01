
/*
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

// Token generation
function generateToken(tokenServerUrl: string, userID: string) {
    return fetch(
        `${tokenServerUrl}/access_token?userID=${userID}&expired_ts=7200`,
        { method: 'GET' }
    ).then((res) => res.json());
}

// Generate random ID
function randomID(len = 5) {
    let result = '';
    const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
    for (let i = 0; i < len; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// URL params extraction
export function getUrlParams(url: string = window.location.href): URLSearchParams {
    return new URLSearchParams(url.split('?')[1]);
}

@Component({
    selector: 'video-call',
    template: `<div #root id="myRoot"></div>`,
    styles: [
        `
            :host {
                display: block;
            }
            #myRoot {
                width: 100vw;
                height: 100vh;
            }
        `,
    ],
})
export class VideoCallComponent {
    @ViewChild('root') root: ElementRef;

    ngAfterViewInit() {
        // Get or generate room ID
        const roomID = getUrlParams().get('roomID') || randomID();
        const userID = randomID();
        const userName = randomID();

        // Determine the role from URL
        const roleParam = getUrlParams(window.location.href).get('role') || 'Host';
        const role =
            roleParam === 'Host'
                ? ZegoUIKitPrebuilt.Host
                : roleParam === 'Cohost'
                    ? ZegoUIKitPrebuilt.Cohost
                    : ZegoUIKitPrebuilt.Audience;

        // Create shared links for co-hosts or audience
        const sharedLinks = [];
        if (role === ZegoUIKitPrebuilt.Host || role === ZegoUIKitPrebuilt.Cohost) {
            sharedLinks.push({
                name: 'Join as co-host',
                url: `${window.location.origin}${window.location.pathname}?roomID=${roomID}&role=Cohost`,
            });
        }
        sharedLinks.push({
            name: 'Join as audience',
            url: `${window.location.origin}${window.location.pathname}?roomID=${roomID}&role=Audience`,
        });

        // Generate token for the video call
        generateToken('https://nextjs-token.vercel.app/api', userID).then((res) => {
            const token = ZegoUIKitPrebuilt.generateKitTokenForProduction(
                1484647939, // Your AppID
                res.token, // Generated token
                roomID, // The room ID
                userID, // The user ID
                userName // The user name
            );

            // Create ZegoUIKit instance and join the room
            const zp = ZegoUIKitPrebuilt.create(token);
            zp.joinRoom({
                container: this.root.nativeElement,
                scenario: {
                    mode: ZegoUIKitPrebuilt.LiveStreaming,
                    config: { role },
                },
                sharedLinks,
            });
        });
    }
}
*/


import { Component, ElementRef, ViewChild } from '@angular/core';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import {MatDialogRef} from "@angular/material/dialog";

// get token
function generateToken(tokenServerUrl: string, userID: string) {
    // Obtain the token interface provided by the App Server
    return fetch(
        `${tokenServerUrl}/access_token?userID=${userID}&expired_ts=7200`,
        {
            method: 'GET',
        }
    ).then((res) => res.json());
}

function randomID(len) {
    let result = '';
    if (result) return result;
    var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
        maxPos = chars.length,
        i;
    len = len || 5;
    for (i = 0; i < len; i++) {
        result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
}

export function getUrlParams(
    url: string = window.location.href
): URLSearchParams {
    let urlStr = url.split('?')[1];
    return new URLSearchParams(urlStr);
}
@Component({
    // selector: 'video-call',
    // template: `<div #root id="myRoot"></div>`,
    // styles: [
    //     `
    //         :host {
    //             display: block;
    //         }
    //         #myRoot {
    //             width: 100vw;
    //             height: 100vh;
    //         }
    //     `,
    // ],
    selector: 'app-client-videocall',
    templateUrl: './client-videocall.component.html',
    styleUrls: ['./client-videocall.component.scss'],
})
export class ClientVideocallComponent {
    // @ViewChild('root')  root: ElementRef;
    @ViewChild('root', { static: false }) root: ElementRef;
    constructor(private dialogRef: MatDialogRef<ClientVideocallComponent>) {}  // Inject MatDialogRef

    ngAfterViewInit() {
        const roomID = getUrlParams().get('roomID') || randomID(5);
        const userID = randomID(5);
        const userName = randomID(5);
        let role_str = getUrlParams(window.location.href).get('role') || 'Host';
        const role =
            role_str === 'Host'
                ? ZegoUIKitPrebuilt.Host
                : role_str === 'Cohost'
                    ? ZegoUIKitPrebuilt.Cohost
                    : ZegoUIKitPrebuilt.Audience;

        let sharedLinks = [];
        if (role === ZegoUIKitPrebuilt.Host || role === ZegoUIKitPrebuilt.Cohost) {
            sharedLinks.push({
                name: 'Join as co-host',
                url:
                    window.location.origin +
                    window.location.pathname +
                    '?roomID=' +
                    roomID +
                    '&role=Cohost',
            });
        }
        sharedLinks.push({
            name: 'Join as audience',
            url:
                window.location.origin +
                window.location.pathname +
                '?roomID=' +
                roomID +
                '&role=Audience',
        });

        // generate token
        generateToken('https://nextjs-token.vercel.app/api', userID).then((res) => {
            const token = ZegoUIKitPrebuilt.generateKitTokenForProduction(
                1484647939,
                res.token,
                roomID,
                userID,
                userName
            );
            // create instance object from token
            const zp = ZegoUIKitPrebuilt.create(token);

            console.log(
                'this.root.nativeElement',
                this.root.nativeElement.clientWidth
            );
            // start the call
            zp.joinRoom({
                container: this.root.nativeElement,
                scenario: {
                    mode: ZegoUIKitPrebuilt.LiveStreaming,
                    config: {
                        role,
                    },
                },
                sharedLinks,
            });
        });
    }

    // Function to close the modal
    closeDialog() {
        this.dialogRef.close();

    }
}
