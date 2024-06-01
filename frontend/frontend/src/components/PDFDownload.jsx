import React from "react";
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  image: {
    width: "100%",
    marginBottom: 10,
  },
  text: {
    marginBottom: 10,
  },
});

const PDFPage = ({ data }) => {
  console.log("Data: Image", data.image1);

  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Image src={data.coverimage} style={styles.image} />
        <Text style={styles.text}>{data.storybook_title}</Text>

        <Image src={data.image1} style={styles.image} />
        <Text style={styles.text}>{data.text1}</Text>

        <Image src={data.image2} style={styles.image} />
        <Text style={styles.text}>{data.text2}</Text>

        <Image src={data.image3} style={styles.image} />
        <Text style={styles.text}>{data.text3}</Text>

        <Image src={data.image4} style={styles.image} />
        <Text style={styles.text}>{data.text4}</Text>

        <Image src={data.image5} style={styles.image} />
        <Text style={styles.text}>{data.text5}</Text>
      </View>
    </Page>
  );
};

const PDFDownload = ({ data }) => {
  console.log("Data:", data);

  return (
    <PDFDownloadLink
      document={
        <Document>
          <PDFPage data={data} />
        </Document>
      }
      fileName={`${data.storybook_title}.pdf`}
    >
      {({ blob, url, loading, error }) =>
        loading ? "Loading document..." : "Download PDF"
      }
    </PDFDownloadLink>
  );
};

export default PDFDownload;
