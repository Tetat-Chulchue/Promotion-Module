import React, { Component } from "react";
import styles from "./home.module.css";
import Card from "../../components/Card/Card";
import axios from "axios";
import { SERVER } from "../../util/server.json";

export default class home extends Component {
  constructor() {
    super();
    this.state = {
      promotions: [],
    };
  }

  componentDidMount() {
    axios
      .get(SERVER + "/promotion")
      .then((res) => {
        console.log(res);
        this.setState({
          promotions: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className={styles.screen}>
        {this.state.promotions.map((data, index) => {
          return (
            <Card
              data={data}
              key={index}
              onDelete={(id) => {
                let updateArray = this.state.promotions;
                let index = updateArray.findIndex((x) => x.id === id);
                updateArray.splice(index, 1);
                console.log(updateArray);
                this.setState({
                  promotions: updateArray,
                });
              }}
            ></Card>
          );
        })}
      </div>
    );
  }
}
