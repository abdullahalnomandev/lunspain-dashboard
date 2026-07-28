import Title from 'antd/es/typography/Title'

export default function HeaderTitle({title,subtitle}:{title:string,subtitle?:string}) {
  return (
    <div className=''>
      <Title
        level={3}
        className="!font-semibold !my-0 text-2xl"
      >
        {title} <span className="text-orange-500 font-semibold">{subtitle}</span>
      </Title>
    </div>
  )
}
