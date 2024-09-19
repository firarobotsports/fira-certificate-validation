import {useEffect, useRef, useState} from 'react';
import QrScanner from 'qr-scanner';

const QrScan = () => {
    const scanner = useRef<QrScanner>();
    const videoEl = useRef<HTMLVideoElement>(null);
    const qrBoxEl = useRef<HTMLDivElement>(null);
    const [qrOn, setQrOn] = useState<boolean>(true);
    
    const [scannedResult, setScannedResult] = useState<string | undefined>("");

     // Success
    const onScanSuccess = (result: QrScanner.ScanResult) => {
        // 🖨 Print the "result" to browser console.
        console.log(result);
        // ✅ Handle success.
        // 😎 You can do whatever you want with the scanned result.
        setScannedResult(result?.data);
    };

    // Fail
    const onScanFail = (err: string | Error) => {
        // 🖨 Print the "err" to browser console.
        console.log(err);
    };

    useEffect( () => {
        if ((videoEl?.current) && (!scanner.current)) {
            scanner.current = new QrScanner(videoEl?.current, onScanSuccess,
                {
                    onDecodeError: onScanFail,
                    preferredCamera: "environment",
                    highlightScanRegion: true,
                    highlightCodeOutline: true,
                    overlay: qrBoxEl?.current || undefined,
                });

                scanner?.current?.start().then( () => {
                    setQrOn(true);
                });
        }
        return () => {
            if (!videoEl?.current) {
                scanner?.current?.stop();
            }
        }
    }, []);

    // ❌ If "camera" is not allowed in browser permissions, show an alert.
    useEffect(() => {
        if (!qrOn)
        alert(
            "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
        );
    }, [qrOn]);
    
    return (
        <> 
            <div className="qr-reader"> 
                <video ref={videoEl} style={{width:320,height:240}}></video>
                <div ref={qrBoxEl} className="qr-box"> 
                    <img
                        src="//:0"
                        alt="QR Frame"
                        width={256}
                        height={256}
                        className="qr-frame"
                    />
                </div>
                    {/* Show Data Result if scan is success */}
                    {scannedResult && (
                        <p
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            zIndex: 99999,
                            color: "white",
                        }}
                        >
                        Scanned Result: {scannedResult}
                        </p>
                    )}
            </div>
        </>
    )
}

export default QrScan;
