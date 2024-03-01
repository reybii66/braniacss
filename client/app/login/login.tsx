// "use client"
// import React from "react";
// import { Divider, Link, Image,Input,Button} from "@nextui-org/react";
// import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";

// import { useRouter } from "next/navigation";
// // import { useRouter } from "next/router";

// export default function ModalLogin() {
//   const router = useRouter()
//   // const handleClick = () => {
//   //   router.push('/userdash')
//   // }
//   return (
//     <Card className="max-w-[400px]">
//       <CardHeader className="flex gap-3">
//         <div className="flex flex-col">
//         <h2>Login/Sign-Up</h2> <br />
//           {/* <p className="text-small text-default-500">nextui.org</p> */}
//         </div>
//       </CardHeader>
//       <Divider/>
//       <CardBody>
//         <form action="">
//         <Input
//             isRequired
//             type="email"
//             label="Email"
//             className="max-w-xs"
//             placeholder="Enter the email-id"
//             name="email"
//         /> <br />
//         <Input
//             isRequired
//             type="password"
//             label="Password"
//             className="max-w-xs"
//             placeholder="Enter the password"
//             name="pass"
//         /> <br />
//         <Button radius="full" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
//           onClick={() => router.push("/userdash")}
//         >
//             Login
//         </Button>
//         </form>
//       </CardBody>
//       {/* <Divider/> */}
//       {/* <CardFooter>
//         <Link
//           isExternal
//           showAnchorIcon
//           href="https://github.com/nextui-org/nextui"
//         >
//           Visit source code on GitHub.
//         </Link>
//       </CardFooter> */}
//     </Card>
//   );
// }
// // import React from 'react';
// // import {
// //    Modal,
// //    Input,
// //    Row,
// //    Checkbox,
// //    Button,
// //    Text,
// //    Navbar,
// // } from '@nextui-org/react';

// // export const ModalLogin = () => {
// //    const [visible, setVisible] = React.useState(false);
// //    const handler = () => setVisible(true);
// //    const closeHandler = () => {
// //       setVisible(false);
// //       console.log('closed');
// //    };
// //    return (
// //       <div>
// //          <Navbar.Link onClick={handler}>Login</Navbar.Link>
// //          <Modal
// //             closeButton
// //             blur
// //             aria-labelledby="modal-title"
// //             open={visible}
// //             onClose={closeHandler}
// //          >
// //             <Modal.Header>
// //                <Text id="modal-title" size={18}>
// //                   Welcome to
// //                   <Text b size={18}>
// //                      NextUI
// //                   </Text>
// //                </Text>
// //             </Modal.Header>
// //             <Modal.Body>
// //                <Input
// //                   clearable
// //                   bordered
// //                   fullWidth
// //                   color="primary"
// //                   size="lg"
// //                   placeholder="Email"
// //                   //   contentLeft={<Mail fill="currentColor" />}
// //                />
// //                <Input
// //                   clearable
// //                   bordered
// //                   fullWidth
// //                   color="primary"
// //                   size="lg"
// //                   placeholder="Password"
// //                   //   contentLeft={<Password fill="currentColor" />}
// //                />
// //                <Row justify="space-between">
// //                   <Checkbox>
// //                      <Text size={14}>Remember me</Text>
// //                   </Checkbox>
// //                   <Text size={14}>Forgot password?</Text>
// //                </Row>
// //             </Modal.Body>
// //             <Modal.Footer>
// //                <Button auto flat color="error" onClick={closeHandler}>
// //                   Close
// //                </Button>
// //                <Button auto onClick={closeHandler}>
// //                   Sign in
// //                </Button>
// //             </Modal.Footer>
// //          </Modal>
// //       </div>
// //    );
// // };
