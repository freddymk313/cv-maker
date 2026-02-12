// src/components/cv/templates/ClassicTemplate.tsx
export default function ClassicTemplate({ data }: { data: any }) {
  return (
    <div className="p-10 font-serif border">
      <h1 className="text-3xl font-bold border-b-2 border-black">{data.personalInfo.firstName} {data.personalInfo.lastName}</h1>
      <p className="text-blue-700 font-bold mt-2">{data.title}</p>
      
      <div className="mt-6">
        <h2 className="font-bold uppercase bg-gray-100 p-1">Expériences</h2>
        {data.experiences.map((exp: any, i: number) => (
          <div key={i} className="mt-2">
            <p className="font-bold">{exp.position} @ {exp.company}</p>
            <p className="text-sm italic">{exp.startDate} - {exp.isCurrent ? "Présent" : exp.endDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
}