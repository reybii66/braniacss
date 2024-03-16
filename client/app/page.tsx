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
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { useDisclosure, Button, Input } from '@nextui-org/react';
import ModSign from "./signmodal/signmodal";
// import { useRouter } from "next/navigation";

export default function Home() {
	// const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
					<Button radius="full" onClick={() => router.push('/signmodal')}>
						SignIn
					</Button>
					<Button radius="full" onClick={() => router.push('/studentregister')}>
						Register
					</Button>
				</div>

				{/* <div className="mt-8"> */}
					{/* <Snippet hideSymbol hideCopyButton variant="flat">
						<span>
						Get started by editing <Code color="primary">app/page.tsx</Code>
					</span>
					</Snippet> */}
				{/* </div> */}
			</section>
		</>
	);
}
