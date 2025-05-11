import { Children } from 'react';

export default function SlideController({children}) {
  let all_children = Children.toArray(children)
  let to_render = all_children.map((child, i) => {
    return (
      <div key={i}>
        {child}
      </div>
    )
  })

  return (
    <div className="wrap">
      { to_render }
    </div>
  )
};

