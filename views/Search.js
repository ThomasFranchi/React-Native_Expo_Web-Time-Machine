import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format, parse } from "date-fns";

export default function Search({ navigation }) {

    //  Search function Constances
  const [siteSearched, setSiteSearched] = useState("");
  const [resultApi, setResultApi] = useState();
  const [isLoading, setLoading] = useState(false);

  //  Error message Constance
  const [errorMessage, setErrorMessage] = useState("");
//   const [result, setResult] = useState(null);


  // DateTimePicker Constances
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);


// function FETCH to wayBackMachine API

  const getSite = async () => {
     setLoading(true);

     // Check if the input is empty
    if (siteSearched === "") {
      setErrorMessage("Veuillez entrer l'adresse d'un site internet");
      setLoading(false);

    // Check if there's a "." in the string if not ask to enter the site extension (example ".com" )
    } else if (siteSearched.includes(".") == false) {
      setErrorMessage(
        `Veuillez indiquer l'extension du site\npar exemple site.com`
      );
      setLoading(false);
    } else {

    //   
      try {
        setResultApi();
        const response = await fetch(
          `http://archive.org/wayback/available?url=${siteSearched}&timestamp=${format(
            date,
            "yyyyMMdd"
          )}`
        );
        const data = await response.json();

        setResultApi(data);
        console.log("resultApi", resultApi);

        setErrorMessage("");
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };


// function Set time to search on wayBackMachine API

  const DateTime = () => {
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setShow(false);
      setDate(currentDate);
    };

    const showMode = (currentMode) => {
      if (Platform.OS === "android") {
        setShow(true);
        // for iOS, add a button that closes the picker
      }
      setMode(currentMode);
    };

    const showDatepicker = () => {
      showMode("date");
    };

    const showTimepicker = () => {
      showMode("time");
    };

    return (
      <View style={styles.inputContainer}>
        <Text style={styles.text}>à la date du :</Text>

        <TouchableOpacity onPress={showDatepicker}>
          <View pointerEvents="none">
            <TextInput
              style={styles.input}
              value={date.toLocaleString().substring(0, 10)}
              onPress={showDatepicker}
              placeholder="URL du site recherché"
              keyboardType="default"
            ></TextInput>
          </View>
        </TouchableOpacity>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        )}
      </View>
    );
  };


// function open into WebBrowser
  const _handlePressButtonAsync = async () => {
    try {
      let result = await WebBrowser.openBrowserAsync(
        `${resultApi?.archived_snapshots?.closest?.url}`
      );
    //   setResult(result);
    } catch (error) {
      console.error(error);
    }
  };



  //
  // Render View
  //

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.containerScroll}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.topContainer}>
            <Text style={styles.title}>Internet Archive</Text>
            <Text style={styles.text}>Site recherché :</Text>
            <TextInput
              style={styles.input}
              onChangeText={setSiteSearched}
              value={siteSearched?.url}
              placeholder="URL du site recherché"
              keyboardType="default"
            ></TextInput>

            {DateTime()}
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.buttonTime} onPress={() => getSite()}>
            <Text style={styles.textTime}>Voyager dans le temps !</Text>
          </TouchableOpacity>
          {errorMessage ? (
            <Text style={styles.text}>{errorMessage}</Text>
          ) : (
            <Text></Text>
          )}
          {isLoading && <ActivityIndicator size="large" color="#76009d" />}

          {resultApi?.archived_snapshots?.closest?.available &&
            !errorMessage && (
              <View style={styles.resultContainer}>
                <Text style={styles.text}>{resultApi?.url} est archivé !</Text>

                {format(date, "dd/MM/yyyy") ==
                format(
                  parse(
                    resultApi?.archived_snapshots?.closest?.timestamp,
                    "yyyyMMddHHmmss",
                    new Date()
                  ),
                  "dd/MM/yyyy"
                ) ? (
                  <Text
                    style={styles.text}
                  >{` à la date recherchée soit le  : ${format(
                    date,
                    "dd/MM/yyyy"
                  )}`}</Text>
                ) : (
                  <View>
                    <Text style={styles.text}>{`Date recherchée : ${format(
                      date,
                      "dd/MM/yyyy"
                    )}`}</Text>
                    <Text
                      style={styles.text}
                    >{`Date trouvée la plus proche : ${format(
                      parse(
                        resultApi?.archived_snapshots?.closest?.timestamp,
                        "yyyyMMddHHmmss",
                        new Date()
                      ),
                      "dd/MM/yyyy"
                    )}`}</Text>
                  </View>
                )}

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={_handlePressButtonAsync}
                  >
                    <Text
                      style={styles.textbutton}
                    >{`Ouvrir dans\nle navigateur`}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                      navigation.navigate("Preview", {
                        sitePreview:
                          resultApi?.archived_snapshots?.closest?.url,
                      })
                    }
                  >
                    <Text style={styles.textbutton}>Prévisualiser</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffbb00",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 60,
  },

  containerScroll: { alignItems: "center" },

  bottomContainer: {
    flex: 1,
    alignContent: "flex-end",
    justifyContent: "flex-end",
  },

  topContainer: { flex: 1, alignContent: "center", justifyContent: "center" },

  buttonDateSearch: {
    backgroundColor: "#a92e34",
    paddingVertical: 8,
    paddingHorizontal: 24,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 16,
    marginTop: 6,
  },

  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },

  resultContainer: { flex: 1, alignItems: "center", textAlign: "center" },

  buttonContainer: {
    flexDirection: "row",
  },

  text: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 2,
  },

  input: {
    borderRadius: 16,
    backgroundColor: "#fff",
    width: 280,
    height: 50,
    margin: 10,
    padding: 10,
    fontSize: 16,
  },

  buttonTime: {
    backgroundColor: "#a92e34",
    paddingVertical: 18,
    paddingHorizontal: 34,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 16,
    marginTop: 120,
    marginBottom: 10,
    marginHorizontal: 4,
  },

  button: {
    backgroundColor: "#a92e34",
    paddingVertical: 18,
    paddingHorizontal: 34,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 16,
    marginVertical: 36,
    marginHorizontal: 4,
  },

  textbutton: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },

  textTime: {
    color: "#ffbb00",
    alignSelf: "center",
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
  },
  title: {
    fontSize: 28,
    // color: "white",
    // backgroundColor: "#76009d",
    paddingHorizontal: 2,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
});






































  //   const [formatedDateForApi, setFormatedDateForApi] = useState();
  //   const [formatedDateSearched, setFormatedDateSearched] = useState();
  //   const [parsedDate, setParsedDate] = useState();
  //   const [formatedDateFound, setFormatedDateFound] = useState();

  //   useEffect(() => {
  //     setFormatedDateForApi(format(date, "yyyyMMdd"));
  //     console.log("formatedDateForApi", formatedDateForApi);
  //     setFormatedDateSearched(format(date, "dd/MM/yyyy"));
  //     console.log("formatedDateSearched", formatedDateSearched);
  //     console.log("resultApi", resultApi);
  //     if(resultApi?.archived_snapshots?.closest?.timestamp) {
  //         setParsedDate(
  //         parse(
  //           resultApi?.archived_snapshots?.closest?.timestamp,
  //           "yyyyMMddHHmmss",
  //           new Date()
  //         )
  //       );}

  //   }, [date,siteSearched ]);

  //   const formatedDateForApi = format(date, "yyyyMMddhhss");
  //   console.log("formatedDateForApi",formatedDateForApi)

  //   const formatedDateSearched = format(date, "dd/MM/yyyy");
  //   console.log("formatedDateSearched",formatedDateSearched)

  //   let parsedDate;

  //   if (resultApi?.archived_snapshots.closest.timestamp) {
  //     parsedDate = parse(
  //       resultApi?.archived_snapshots.closest.timestamp,
  //       'yyyyMMddhhssSS',
  //       new Date()
  //     );
  //   }
  //   let formatedDateFound;
  //   if (parsedDate !== undefined) {
  //     formatedDateFound = format(parsedDate, "dd/MM/yyyy");
  //   }