import CalendlyEmbed from "@/components/CalendlyEmbed";
import DemoApp from "@/components/scheduler/sheduler";

// import Overview from "@/components/sheduler";
import { ScheduleComponent } from "@syncfusion/ej2-react-schedule";

export default function Home() {
  return (
    <div className="dark:bg-slate-800">
      <h1 className="flex flex-col font-extrabold items-center font-size: 2.25rem line-height: 2.5rem">Schedule an Appointment</h1>
      <div className="">
        {/* <CalendlyEmbed url="https://calendly.com/reybinabraham"/> */}
     {/* <Overview/> */}
     <DemoApp/>
      </div>
    </div>
  );
}   