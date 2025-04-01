// src/components/About.jsx
import React from 'react';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, Box, List, ListItem, ListItemText } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const About = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        About Quantify
      </Typography>
      <Box>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>About the Quantify Company</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Quantify is based in Texas, United States of America, and follows all regulations and requirements for local state and the federal government.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Multiple Broker APIs</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" gutterBottom>
              Quantify uses multiple APIs and will change APIs based on the API availability and is not dependent on one API. This may require you to re-establish a broker account with a specific broker to continue trading with our bots. This allows Quantify to continue operating. We will warn you about creating additional broker accounts and moving your funds between them if an API becomes unavailable for use on Quantify. we handle all broker creation accounts internally for Security and Convienance using their API.
            </Typography>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Alpaca</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Details about Alpaca API usage...
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Interactive Brokers</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Details about Interactive Brokers API usage...
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Crypto APIs</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Details about Crypto APIs usage...
                </Typography>
              </AccordionDetails>
            </Accordion>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Investment Warnings</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem>
                <ListItemText>
                  • Investing in financial markets involves risk. You should be aware that the value of investments can go down as well as up, and you may not get back the amount originally invested.
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  • Past performance is not necessarily indicative of future results. You should not assume that the future performance of any specific investment or investment strategy will be profitable or equal to corresponding past performance levels.
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  • There are no guarantees that you will earn any profits or that your investments will achieve any targeted returns. Any investment has the potential for loss as well as gain.
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  • Diversification of your investment portfolio does not eliminate risk. While it can help to spread risk, it does not ensure a profit or guarantee against loss.
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  • Using leverage can magnify both gains and losses. You should be aware that leverage can lead to significant losses, and you may lose more than your initial investment.
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  • Investing in cryptocurrencies involves a high degree of risk. Cryptocurrencies are highly volatile and can experience large price swings. They are also subject to regulatory scrutiny and changes, which can impact their value and legality.
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  • All investments should comply with local, state, and federal regulations. Failure to comply with regulatory requirements can result in legal consequences and financial losses.
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  • Market conditions can affect the performance of investments. Changes in economic conditions, interest rates, political events, and other factors can influence market prices and impact the value of your investments.
                </ListItemText>
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
};

export default About;
