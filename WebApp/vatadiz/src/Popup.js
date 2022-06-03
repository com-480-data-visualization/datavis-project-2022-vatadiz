import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import text_content from "./data/text_content.js"
import ReactMarkdown from 'react-markdown';
import GitHubIcon from '@mui/icons-material/GitHub';
import MetricChooser from './MetricChooser.js';
import { motion } from 'framer-motion';
const Popup = () => {
  const [open, setOpen] = React.useState(true);
  // const text_content = "Salut la mif"
  // const handleClickOpen = (scrollType) => () => {
  //   setOpen(true);
  //   setScroll(scrollType);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1}}
      transition={{ duration: 3}}>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        maxWidth="xl"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">RLCS Winter Major VataDiz</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <ReactMarkdown>
              {text_content}
            </ReactMarkdown>
            <MetricChooser />

          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button onClick={() => window.open("https://github.com/com-480-data-visualization/datavis-project-2022-vatadiz", "blank_")}><GitHubIcon /></Button>
          <Button onClick={handleClose} variant="contained">The Viz -> </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  )
}

export default Popup