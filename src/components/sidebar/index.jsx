import React from "react";
import { Input, Button, Modal, ModalHeader, ModalBody } from "reactstrap";

import PollList from "./pollList";

class Sidebar extends React.Component {
  state = {
    openModal: false,
  };

  toggleModal = () => {
    this.setState({ openModal: !this.state.openModal });
  };

  render() {
    return (
      <div
        style={{ background: "#efefef", padding: "20px", borderRadius: "5px" }}
      >
        <div className="d-flex mb-5">
          <Input
            type="search"
            placeholder="Search Poll"
            value={this.props.searchTerm}
            onChange={(e) => this.props.handleSearch(e.target.value)}
          />
          <Button className="ml-2" color="primary" onClick={this.toggleModal}>
            New
          </Button>
        </div>
        <h3>List of Polls</h3>
        <hr />
        <PollList polls={this.props.polls} selectPoll={this.props.selectPoll} />

        <Modal
          isOpen={this.state.openModal}
          toggle={this.toggleModal}
          unmountOnClose={true}
        >
          <ModalHeader toggle={this.toggleModal}>Create A New Poll</ModalHeader>
          <ModalBody>This is the Modal Body</ModalBody>
        </Modal>
      </div>
    );
  }
}

export default Sidebar;
