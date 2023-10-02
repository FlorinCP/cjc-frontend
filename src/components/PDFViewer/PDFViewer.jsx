import React, { useEffect, useMemo, useRef, useState } from "react";
import { Document, Page, pdfjs, View } from "react-pdf";
import style from "./PDFViewer.module.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function PDFViewer(props) {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [numPages, setNumPages] = useState();
  const [width, setWidth] = useState(1000);

  const docRef = useRef(null);

  const handleScroll = (e) => {
    if (docRef.current) {
      const currentScrollPos = e.target.scrollTop;
      if (currentScrollPos > prevScrollPos) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setPrevScrollPos(currentScrollPos);
    }
  };

  const receivedByteArray = useMemo(() => {
    return props.pdfData;
  }, [props.pdfData]);

  useEffect(() => {
    const element = docRef.current;

    if (element) {
      element.addEventListener("scroll", handleScroll);
    }

    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

   function generatePages(numPages) {
    console.log(numPages);

    return Array.from(new Array(numPages), (el, index) => (
      <Page
        width={width}
        height={650}
        key={`page_${index + 1}`}
        pageNumber={index + 1}
      />
    ));
  }

   function MyDocument({ receivedByteArray }) {
    let pages = generatePages(props.pages);

    function onDocumentLoadSuccess({ numPages }) {
      console.log(numPages, " num pages");
      setNumPages(numPages);

      return numPages;
    }

    console.log(pages);

    return (
      <div className={style.wrapper} ref={docRef}>
        <Document
          onLoadSuccess={onDocumentLoadSuccess}
          file={{ data: receivedByteArray }}
        >
          {pages}
        </Document>
      </div>
    );
  }


  const memoizedDocument = useMemo(() => {
      return <MyDocument receivedByteArray={props.pdfData} />;
  }, [props.pdfData]);

  function changePageBack() {
    props.moveBack()
  }

  function changePageNext() {
    props.moveForward()
  }

  function closeModal() {
    props.closeModalEmit(true);
  }

  return (
    <div className={style.componentWrapper}>
      <button className={style.closeModal} onClick={closeModal}>
        <span className="material-symbols-outlined">close</span>
      </button>
      <div className={style.documentCommands}>
        <div className={style.goBack} onClick={changePageBack}>
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </div>
        <div className={style.documentContainer}>
          <div
            className={visible ? style.documentInfo : style.documentInfoHidden}
          >
            <p>{numPages} Pages</p>
            <p className={style.title}>{props.title}</p>
            <div className={style.documentButtons}>
              <span className="material-symbols-outlined">download</span>
              <span className="material-symbols-outlined">bookmark</span>
            </div>
          </div>
          {/*<Document*/}
          {/*  onLoadSuccess={onDocumentLoadSuccess}*/}
          {/*  file={{ data: receivedByteArray }}*/}
          {/*  className={style.wrapper}*/}
          {/*  onScroll={handleScroll}*/}
          {/*>*/}
          {/*  /!*<Page pageNumber={pageNumber}  width={width} />*!/*/}

          {/*  {Array.from(new Array(numPages), (el, index) => (*/}
          {/*    <Page*/}
          {/*      width={width}*/}
          {/*      height={650}*/}
          {/*      key={`page_${index + 1}`}*/}
          {/*      pageNumber={index + 1}*/}
          {/*    />*/}
          {/*  ))}*/}
          {/*</Document>*/}

          {memoizedDocument}
        </div>
        <div className={style.goNext} onClick={changePageNext}>
          <span className="material-symbols-outlined">arrow_forward_ios</span>
        </div>
      </div>
    </div>
  );
}

export default PDFViewer;
