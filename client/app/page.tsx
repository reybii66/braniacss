"use client"
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import ModalSign from "./signmodal/page";
import { Navbar } from "@/components/navbar";
// import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import {  Modal,   ModalContent,   ModalHeader,   ModalBody,   ModalFooter} from "@nextui-org/modal";
import {useDisclosure, Button,Input} from '@nextui-org/react';
// import { useRouter } from "next/navigation";

export default function Home() {
	const {isOpen, onOpen, onOpenChange} = useDisclosure();
	const router = useRouter();
	return (
		<>
			<Navbar />
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title()}>Elevate your intellect with&nbsp;</h1>
				<h1 className={title({ color: "violet" })}>Braniacs&nbsp;</h1>
				<br />
				{/* <h1 className={title()}>
					where bright minds thrive through
				</h1> */}
				<h2 className={subtitle({ class: "mt-4" })}>
				where bright minds thrive through personalized online tutoring!
				</h2>
			</div>

			<div className="flex gap-3">
				{/* <Link
					href={'/login'}
					className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
					>
					SignIn
				</Link> */}
				{/* modal sign */}
				{/* <ModSign/> */}

				<Button className="rounded-full" onPress={onOpen} >Sign In</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="flex items-center justify-center ">
          {(onClose) => (
          <>
              <ModalHeader className="">Login IN</ModalHeader>
                <ModalBody className="w-full ">
                      
                  <form action="">
                        <Input
                          isRequired
                          type="email"
                          label="Email"
                          className=" text-gray-900 text-sm block w-full p-3.5"
                          name="email"
                          /> <br />
                        <Input
                          isRequired
                          type="password"
                          label="Password"
                          className=" text-gray-900 text-sm block w-full p-3.5"
                          name="pass"
                          /> <br />
                      <div className="flex flex-col items-center justify-center">
                          <Button radius="full" className="color: inherit; h-10  px-12 bg-gradient-to-tr from-violet-500 to-blue-900 text-white shadow-lg focus:shadow-outline hover:bg-indigo-400"
                            onClick={() => router.push("/dashboard")}
                            >
                          Login
                          </Button> 
                          <br /><p>OR</p>
                          <br />
                          <button className=" border-stroke dark:text-body-color-dark dark:shadow-two mb-6 flex w-full items-center justify-center rounded-sm-5 border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none">
                  <span className="mr-3">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_95:967)">
                        <path
                          d="M20.0001 10.2216C20.0122 9.53416 19.9397 8.84776 19.7844 8.17725H10.2042V11.8883H15.8277C15.7211 12.539 15.4814 13.1618 15.1229 13.7194C14.7644 14.2769 14.2946 14.7577 13.7416 15.1327L13.722 15.257L16.7512 17.5567L16.961 17.5772C18.8883 15.8328 19.9997 13.266 19.9997 10.2216"
                          fill="#4285F4"
                        />
                        <path
                          d="M10.2042 20.0001C12.9592 20.0001 15.2721 19.1111 16.9616 17.5778L13.7416 15.1332C12.88 15.7223 11.7235 16.1334 10.2042 16.1334C8.91385 16.126 7.65863 15.7206 6.61663 14.9747C5.57464 14.2287 4.79879 13.1802 4.39915 11.9778L4.27957 11.9878L1.12973 14.3766L1.08856 14.4888C1.93689 16.1457 3.23879 17.5387 4.84869 18.512C6.45859 19.4852 8.31301 20.0005 10.2046 20.0001"
                          fill="#34A853"
                        />
                        <path
                          d="M4.39911 11.9777C4.17592 11.3411 4.06075 10.673 4.05819 9.99996C4.0623 9.32799 4.17322 8.66075 4.38696 8.02225L4.38127 7.88968L1.19282 5.4624L1.08852 5.51101C0.372885 6.90343 0.00012207 8.4408 0.00012207 9.99987C0.00012207 11.5589 0.372885 13.0963 1.08852 14.4887L4.39911 11.9777Z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M10.2042 3.86663C11.6663 3.84438 13.0804 4.37803 14.1498 5.35558L17.0296 2.59996C15.1826 0.901848 12.7366 -0.0298855 10.2042 -3.6784e-05C8.3126 -0.000477834 6.45819 0.514732 4.8483 1.48798C3.2384 2.46124 1.93649 3.85416 1.08813 5.51101L4.38775 8.02225C4.79132 6.82005 5.56974 5.77231 6.61327 5.02675C7.6568 4.28118 8.91279 3.87541 10.2042 3.86663Z"
                          fill="#EB4335"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_95:967">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  Sign in with Google
                </button>
                        </div>
                    </form>
                  
                
                  {/* <ModalLogin/> */}
              </ModalBody>
              <ModalFooter>
                {/* <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button> */}
                {/* <Button color="primary" onPress={onClose}>
                  Action
                </Button> */}
              </ModalFooter>
          </>
          )}
        </ModalContent>
      </Modal>
				{/* <Link
					isExternal
					className={buttonStyles({ variant: "bordered", radius: "full" })}
					//  href={siteConfig.links.github}
				>
					 
				</Link> */}
				<Button radius="full" onClick={() => router.push('/register')}>
				Register
				</Button>
				

			</div>

			<div className="mt-8">
				<Snippet hideSymbol hideCopyButton variant="flat">
					{/* <span>
						Get started by editing <Code color="primary">app/page.tsx</Code>
					</span> */}
				</Snippet>
			</div>
		</section>
	</>
	);
}
