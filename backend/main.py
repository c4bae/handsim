import cv2
from cvzone.HandTrackingModule import HandDetector
import asyncio, json, websockets

# Webcam
cap = cv2.VideoCapture(0) # 0 refers to default webcam
cap.set(3, 1280)  # Prop id 3 refers to video width
cap.set(4, 720)  # Prop id 4 refers to video height

# Hand Detector
detector = HandDetector(maxHands=1, detectionCon=0.8)


async def hand_landmarks(websocket):
    while True:
        # Get the frame from the webcam
        success, img = cap.read()
        if not success:
            break  # break if program fails to grab frame or recognize webcam
        hands, img = detector.findHands(img)  # hands contains information about hands
        data = {}

        # Landmark values - (x,y,z) * 21 --> total number of values
        if hands:
            # Get the first hand
            hand = hands[0]
            # Get the landmark list (list of 21 lists of landmark cords)
            lmList = hand["lmList"]
            data["landmarks"] = lmList
            print(lmList)

        cv2.imshow("Image", img)  # imshow short for image show, "Image" is window name, img is images
        cv2.waitKey(1)  # Make video refresh every 1 ms

        await websocket.send(json.dumps(data))
        await asyncio.sleep(0.03)


async def main():
    async with websockets.serve(hand_landmarks, "localhost", 3000):
        await asyncio.Future()

asyncio.run(main())
