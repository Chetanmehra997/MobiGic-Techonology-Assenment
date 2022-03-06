import React, { useState, useContext } from "react";
import { Form, Input, message, Button, Space, Drawer } from "antd";
let styles = {
  textAlign: "center",
  zIndex: -1,
  width: "150vh",
  height: "70vh",
};
export const HomeBanner = () => {

  const [form] = Form.useForm();

  const onFinish = () => {
    message.success("Submit success!");
  };

  const onReset = () => {
    form.resetFields();
  };

  const [DeliveryBanSend, setDeliveryBanSend] = useState({ description: "" });
  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDeliveryBanSend({ ...DeliveryBanSend, [name]: value });
  };
  const [DeliveryBanSende, setDeliveryBanSende] = useState({ description: "" });
  const onChangee = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDeliveryBanSende({ ...DeliveryBanSende, [name]: value });
  };
  const [DeliveryBanSendee, setDeliveryBanSendee] = useState({
    description: "",
  });

  
  const onChangeee = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDeliveryBanSendee({ ...DeliveryBanSendee, [name]: value });
  };

  const [file, setFile] = useState(null);
  const onInputChange = (e) => {
    setFile(e.target.files[0]);
  };
  const onFormSubmit = () => {
    const formData = new FormData();
    formData.append("backgroundPic", file);
    formData.append("description", DeliveryBanSend.description);
    formData.append("description", DeliveryBanSende.description);
    formData.append("description", DeliveryBanSendee.description);
  const userId = JSON.parse(localStorage.getItem("userId"));
  const token = JSON.parse(localStorage.getItem("token"));

    fetch(`/updateDSMSellerPicbyId/619cb5053a15e28a1d90d453/${userId}`, {
      method: "PUT",
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
      console.log(data)
      onFinish()
      window.location.reload()
      });
  };

  const [visiblee, setVisiblee] = useState(false);

  const onClose = () => {
    setVisiblee(false);
  };
  const handleButtonClicked = () => {
    setVisiblee(true);
  };

  return (
    <>
      <div className="d-flex">
        <div
          className="main-slider"
          id="home"
          style={{ width: "80%", margin: "80px" }}
        >
          <div className="container" style={{ marginLeft: "20%" }}>
            <div className="row">
              <div className="col-md-4 col-sm-4 col-xs-12 banner-left hidden-xs"></div>
              <div id="jtv-slideshow">
                <div
                  id="rev_slider_4_wrapper"
                  className="rev_slider_wrapper fullwidthbanner-container"
                >
                  <div
                    id="rev_slider_4"
                    className="rev_slider fullwidthabanner"
                  >
                    
                    <div className="tp-bannertimer"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", marginLeft: "50%" }}>
          <Button type="primary" onClick={handleButtonClicked}>
            Update this banner
          </Button>

          <Drawer
            title="Update"
            placement="right"
            onClose={onClose}
            visible={visiblee}
          >
            <form
              name="control-hooks"
              onSubmit={onFormSubmit}
              onFinish={onFinish}
              style={{ marginTop: "50px" }}
            >
              <Form.Item label="Add banner line 1">
                <Input
                  name="description"
                  onChange={onChange}
                  value={DeliveryBanSend.description}
                  required
                />
              </Form.Item>
              <Form.Item label="Add banner line 2">
                <Input
                  name="description"
                  onChange={onChangee}
                  value={DeliveryBanSende.description}
                  required

                />
              </Form.Item>
              <Form.Item label="Add banner line 3">
                <Input
                  name="description"
                  onChange={onChangeee}
                  value={DeliveryBanSendee.description}
                  required

                />
              </Form.Item>
              <Form.Item
                // label="Add logo of seller compan"
                // style={{ width: "250px" }}
              >
                <Input
                  type="file"
                  name="backgroundPic"
                  onChange={onInputChange}
                  required

                />
              </Form.Item>
              <br />
              <br />
              <Form.Item>
                <Form.Item
                  wrapperCol={{
                    span: 12,
                    offset: 6,
                  }}
                >
                  <Space>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                      Reset
                    </Button>
                  </Space>
                </Form.Item>
              </Form.Item>
            </form>
          </Drawer>
        </div>
        <br />

      </div>
    </>
  );
};
