import React, { Component } from 'react'
import axios from 'axios'
import {
    HeartOutlined,
    HeartFilled,
    EditOutlined,
    MailOutlined,
    PhoneOutlined,
    GlobalOutlined,
    DeleteFilled
} from '@ant-design/icons';
import { Button, Card, Row, Col, Modal, Form, Input } from 'antd';


export class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [], name: "", email: "", phone: "", website: "", femail: "", modalvisible: false
        }

    }

    handle = (e) => {

        this.setState(e)
    }

    componentDidMount() {

        axios.get("https://jsonplaceholder.typicode.com/users")
            .then(res => {
                this.setState({ data: res.data })
            })
            .catch(err => {
                console.log(err);
            })

    }

    wish = (email) => {

        var element = document.querySelector('[user="' + email + '"]')

        element.classList.toggle("wish")

        this.setState({})



    }

    delete = (email) => {
        const data = this.state.data.filter(e => e.email != email)
        this.setState({ data })
    }

    editok = (em) => {
        const { name, email, phone, website } = this.state
        let data = [...this.state.data]
        for (var i in data) {
            if (data[i].email == em) {

                data[i].name = name

                data[i].email = email
                data[i].phone = phone
                data[i].website = website

                break
            }

        }
        this.setState({ data, modalvisible: false })



    }



    render() {
        var fun = (email) => {
            if (document.querySelector('[user="' + email + '"]')) {

                return document.querySelector('[user="' + email + '"]').classList.contains("wish")
            }
            return false
        }
        return (
            <>

                <Modal maskStyle={{ background: "transparent" }} title="Basic Modal" visible={this.state.modalvisible} footer={
                    [
                        <Button >Cancel</Button>,
                        <Button type="primary" htmlType="submit" form="mform" >Ok</Button>

                    ]
                }>
                    <Form id="mform" size="medium" initialValues={{
                        ["name"]: this.state.name, ["email"]: this.state.email, ["phone"]: this.state.phone, ["website"]: this.state.website
                    }} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onValuesChange={this.handle} onFinish={() => this.editok(this.state.femail)} >

                        <Form.Item
                            name="name"
                            label="Name"

                            rules={[
                                {
                                    required: true,
                                    message: "This field is required"
                                },
                            ]}
                        >
                            <Input style={{ borderRadius: "4px" }} />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="Email"

                            rules={[
                                {
                                    type: 'email',
                                    message: 'Invalid email',
                                },
                                {
                                    required: true,
                                    message: "This field is required"


                                },
                            ]}
                        >
                            <Input style={{ borderRadius: "4px" }} />
                        </Form.Item>
                        <Form.Item
                            name="phone"
                            label="Phone"

                            rules={[
                                {
                                    required: true,
                                    message: "This field is required"

                                },
                            ]}
                        >
                            <Input style={{ borderRadius: "4px" }} />
                        </Form.Item>
                        <Form.Item
                            name="website"
                            label="Website"

                            rules={[
                                {
                                    required: true,
                                    message: "This field is required"

                                },
                            ]}
                        >
                            <Input style={{ borderRadius: "4px" }} />
                        </Form.Item>
                    </Form>
                </Modal>
                <Row>

                    {this.state.data.map(user =>
                        <Col xs={24} sm={24} md={8} lg={8} xl={6}>
                          
                          <Card style={{ margin: "15px" }} cover={
                                <div className="imgouter">
                                    <img alt="img" src={`https://avatars.dicebear.com/v2/avataaars/${user.name}.svg?options[mood][]=happy`} height="200" width="200" />
                                </div>
                            }
                                actions={
                                    [
                                        <Button className="op" type="text" user={user.email} onClick={() => { this.wish(user.email) }} icon={fun(user.email) ? <HeartFilled className="bodydeticon" style={{ color: "red" }} /> :
                                            <HeartOutlined className="bodydeticon" style={{ color: "red" }} />}
                                        />

                                        ,
                                        <Button icon={<EditOutlined className="bodydeticon" />} type="text" onClick={() => {
                                            this.setState({ name: user.name, email: user.email, femail: user.email, phone: user.phone, website: user.website, modalvisible: true }, () => {
                                            })
                                        }} />

                                        ,
                                        <Button type="text" onClick={() => this.delete(user.email)} icon={<DeleteFilled className="bodydeticon" />} />
                                    ]
                                }>

                                <h3>{user.name}</h3>
                                <div className="bodydet">
                                    <MailOutlined className="bodydeticon" />
                                    <p style={{ marginLeft: "10px" }}>{user.email}</p>
                                </div>
                                <div className="bodydet">
                                    <PhoneOutlined className="bodydeticon" />
                                    <p style={{ marginLeft: "10px" }}>{user.phone}</p>
                                </div>
                                <div className="bodydet">
                                    <GlobalOutlined className="bodydeticon" />
                                    <p style={{ marginLeft: "10px" }}>{user.website}</p>
                                </div>


                            </Card>
                        </Col>
                    )}
                </Row>
            </>
        )
    }
}

export default Home
