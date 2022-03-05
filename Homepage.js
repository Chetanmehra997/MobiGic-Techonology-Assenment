 import React, { useState ,useEffect} from "react"

import { Form, Input, message, Button, Space,Modal } from "antd";

const Homepage = ({setLoginUser}) => {
    // const history = useHistory()
    const [visible, setVisible] = React.useState(false);
    const [cardId, setcardId] = useState("");
    const showModal = (ev) => {
        setVisible(true);
        setcardId({ ...cardId, message: ev.currentTarget.value });
      };
      const [confirmLoading, setConfirmLoading] = React.useState(false);
      const [modalText, setModalText] = React.useState("Content of the modal");
  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    fetch(`http://localhost:5000/images/image/:imageId`, {
      method: "DELETE",
      headers: {
        // Authorization: `Bearer ${token}`
      },
    })
      .then((res) => res.json())
      .then((data) => {});
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
      window.location.reload();
      message.success("Delete success!");
    }, 2000);
  };
      const handleCancel = () => {
        setVisible(false);
      };
    const [form] = Form.useForm();
 const [Images, setImages] = useState([]);
    const onFinish = () => {
      message.success("Submit success!");
    };
  
    const onReset = () => {
      form.resetFields();
    };
    const [file, setFile] = useState(null);
    const onInputChange = (e) => {
        console.log(e.target.files)
      setFile(e.target.files[0]);
    };
    const onFormSubmit = (e) => {
        e.preventDefault();
      const formData = new FormData();
      formData.append("photo", file);
      fetch(`http://localhost:5000/file/create`, {
        method: "POST",
        headers: {
          Accept: 'application/json',
        //   Authorization: `Bearer ${token}`
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
        console.log(data)
        onFinish();
        });
    };
useEffect(() => {
    fetch(`http://localhost:5000/images`)
        .then((res) => res.json())
        .then((data) => {
        console.log(data)
        setImages(data)
        });
}, []);
    
// /image/:imageId

    return (<>
        <div className="homepage">
            <h1>Welcome Login Page</h1>

            <p>Profile Upload
             </p>
             <form
              name="control-hooks"
              onSubmit={onFormSubmit}
              onFinish={onFinish}
              style={{ marginTop: "50px" }}
            >
            
              <Form.Item
                // label="Add logo of seller compan"
                // style={{ width: "250px" }}
              >
                <Input
                  type="file"
                  name="Image"
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
                    <br/>
                    <Button htmlType="button" onClick={onReset}>
                      Reset
                    </Button>
                  </Space>
                </Form.Item>
              </Form.Item>
            </form>
            
   
          <br/>
          Or
          <br/>
          
            <button className="button" onClick={() => setLoginUser({})} >Logout</button>
        </div>
        <div className="imae" style={{display:"flex",flexDirection:"column"}}>

             {
                 Images.map((elm)=>{
                     console.log(elm.photo)
                     return(<>
                     <p>Click on to download the image:</p>
                     <a href={`http://localhost:5000/${elm.photo}`}download>Download </a>
                 
                        <Button
                           type="danger"
                           value={elm._id}
                           onClick={showModal}
                           style={{ marginLeft: "50px" }}
                         >
                           Delete
                         </Button>
                         <br/>
                         <Modal
                title="Title"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
              >
                <p>{modalText}</p>
              </Modal>
                         </> )
                 })
             }
            </div>
    </>)
}

export default Homepage;