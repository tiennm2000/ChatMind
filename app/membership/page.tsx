import PlanCard from "@/components/plan/plan-card";

export default function Membership() {
  return (
    <div>
      <h1 className="text-lg font-bold mt-10 text-center">
        Upgrade with monthly membership
      </h1>
      <div className="flex flex-wrap justify-center">
        <PlanCard name="Monthly" image="monthly" />
        <PlanCard name="Free" image="free" />
      </div>
    </div>
  );
}
