import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Modal,
  StatusBar,
} from "react-native";
import LottieView from "lottie-react-native";
import CloseIcon from "../assets/icons/close.svg";
import { resetResponse } from "../helpers/db";
import TextStyled from "./TextStyled";

const ResponseNotification = ({ response }) => {
  const [isVisible, setIsVisible] = useState(true);

  const closeNotif = () => {
    setIsVisible(false);
    resetResponse();
  };

  const NotifDetails = () => {
    if (response?.res == "YES") {
      return (
        <>
          <LottieView
            style={{
              width: 150,
              height: 150,
            }}
            source={require("../assets/icons/approvedAnimation.json")}
            autoPlay
            loop={false}
          />

          <View style={{ marginHorizontal: 10 }}>
            <TextStyled
              style={{
                textAlign: "center",
                fontSize: 16,
              }}
              bold
            >
              Your partner accepted your request :
            </TextStyled>
          </View>
          <View
            style={{
              marginTop: 10,
              marginHorizontal: 20,
            }}
          >
            <TextStyled
              style={{
                textAlign: "center",
                fontSize: 16,
              }}
              italic
            >
              "{response.msg}"
            </TextStyled>
          </View>
        </>
      );
    } else if (response?.res == "NO") {
      return (
        <>
          <LottieView
            style={{
              width: 150,
              height: 150,
            }}
            source={require("../assets/icons/refusedAnimation.json")}
            autoPlay
            loop={false}
          />

          <View style={{ marginHorizontal: 10 }}>
            <TextStyled style={{ textAlign: "center", fontSize: 16 }} bold>
              Your partner refused your request:
            </TextStyled>
          </View>
          <View style={{ marginTop: 10, marginHorizontal: 20 }}>
            <TextStyled style={{ fontSize: 16, textAlign: "center" }} italic>
              "{response.msg}"
            </TextStyled>
          </View>
        </>
      );
    }
  };

  return (
    <>
      {/* <View style={{ marginTop: 50 }}>
        <Button onPress={() => setIsVisible(true)} title="press" />
      </View> */}
      <StatusBar backgroundColor="rgba(0,0,0,0.7)" />
      <Modal visible={isVisible} transparent animationType="fade">
        <View
          onPress={() => setIsVisible(false)}
          style={{
            marginTop: -50,
            alignItems: "center",
            flex: 1,
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.7)",
          }}
        >
          <View
            style={{
              position: "absolute",
              backgroundColor: "white",
              width: "85%",
              paddingBottom: 30,
              borderRadius: 20,
              alignItems: "center",
            }}
          >
            <TouchableWithoutFeedback onPress={closeNotif}>
              <View
                style={{
                  position: "absolute",
                  right: 5,
                  top: 5,
                  padding: 10,
                }}
              >
                <CloseIcon height={20} width={20} fill="black" />
              </View>
            </TouchableWithoutFeedback>
            <NotifDetails />
          </View>
        </View>
      </Modal>
    </>
  );

  //   const { state } = useContext(moodContext);
  //   const [isNotifOpen, setIsNotifOpen] = useState(true);
  //   useEffect(() => {
  //     setIsNotifOpen(true);
  //   }, [state.Response]);
  //   return (
  //     <NotificationView
  //       setIsNotifOpen={setIsNotifOpen}
  //       isNotifOpen={isNotifOpen}
  //       msg={state.Request}
  //     >
  //       <View>
  //         <Text>{state.Response?.res}</Text>
  //       </View>
  //     </NotificationView>
  //   );
};

export default ResponseNotification;

const styles = StyleSheet.create({});
