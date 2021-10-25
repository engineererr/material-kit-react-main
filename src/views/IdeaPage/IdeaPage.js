import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import AddIcon from "@material-ui/icons/Add";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-kit-react/views/ideaPage.js";

import image from "assets/img/bg7.jpg";
import { ClickAwayListener, Fab, Typography } from "@material-ui/core";
import Badge from "components/Badge/Badge.js";
import CustomInput from "components/CustomInput/CustomInput";

const useStyles = makeStyles(styles);

export default function IdeaPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [addCardAnimaton, setAddCardAnimation] =
    React.useState("addCardHidden");

  setTimeout(function () {
    setCardAnimation("");
  }, 700);

  const classes = useStyles();
  const { ...rest } = props;

  let testCards = [
    {
      title: "First",
      body: "body",
      countUp: 1,
      countDown: 1,
    },
    {
      title: "Second",
      body: "body",
      countUp: 1,
      countDown: 1,
    },
  ];
  const [cards, setCard] = React.useState(testCards);

  const handleVote = (i, up) => {
    let cardsCopy = [...cards];
    let item = cardsCopy[i];
    if (up) {
      item.countUp++;
    } else {
      item.countDown++;
    }
    cardsCopy[i] = item;
    setCard(cardsCopy);
  };

  const handleFabAddClick = () => {
    setAddCardAnimation("");
  };

  const handleAddCardClickAway = () => {
    setAddCardAnimation("addCardHidden");
  };

  const handleSave = (e) => {
    e.preventDefault();
    let formData = e.target;
    setAddCardAnimation("addCardHidden");
    let cardsCopy = [...cards];
    let item = {
      title: formData.elements["title"].value,
      body: formData.elements["description"].value,
      countUp: 0,
      countDown: 0,
    };

    formData.elements["title"].value = "";
    formData.elements["description"].value = "";

    cardsCopy.push(item);
    setCard(cardsCopy);
  };

  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="duedingen.io"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <ClickAwayListener onClickAway={handleAddCardClickAway}>
            <div>
              <Fab
                color="primary"
                aria-label="add"
                onClick={handleFabAddClick}
                className={classes.fab}
              >
                <AddIcon />
              </Fab>
              <GridItem xs={12} sm={12} md={12}>
                <form className={classes.form} onSubmit={handleSave}>
                  <Card className={classes[addCardAnimaton]}>
                    <CardBody>
                      <CustomInput
                        labelText="Title"
                        id="title"
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />

                      <CustomInput
                        labelText="Description"
                        id="description"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          multiline: true,
                          rows: 5,
                        }}
                      />
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button simple color="primary" size="lg" type="submit">
                        Save
                      </Button>
                    </CardFooter>
                  </Card>
                </form>
              </GridItem>
            </div>
          </ClickAwayListener>
          <GridContainer justify="center">
            {cards
              .sort((a, b) => {
                return b.countUp - b.countDown - (a.countUp - a.countDown);
              })
              .map((card, i) => {
                return (
                  <GridItem xs={12} sm={12} md={4} key={i}>
                    <Card className={classes[cardAnimaton]}>
                      <CardHeader
                        color="primary"
                        className={classes.cardHeader}
                      >
                        <h4>{card.title}</h4>
                        <div className={classes.socialLine}>
                          <Badge color="success">{card.countUp}</Badge>
                          <Button
                            justIcon
                            href="#pablo"
                            target="_blank"
                            color="transparent"
                            onClick={(e) => {
                              e.preventDefault();
                              handleVote(i, true);
                            }}
                          >
                            <i className={"fas fa-arrow-up"} />
                          </Button>
                          <Button
                            justIcon
                            href="#pablo"
                            target="_blank"
                            color="transparent"
                            onClick={(e) => {
                              e.preventDefault();
                              handleVote(i, false);
                            }}
                          >
                            <i className={"fas fa-arrow-down"} />
                          </Button>
                          <Badge color="danger">{card.countDown}</Badge>
                        </div>
                      </CardHeader>
                      <CardBody>
                        <Typography paragraph>{card.body}</Typography>
                      </CardBody>
                      <CardFooter className={classes.cardFooter}>
                        <Button simple color="primary" size="lg">
                          Comment
                        </Button>
                      </CardFooter>
                    </Card>
                  </GridItem>
                );
              })}
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
