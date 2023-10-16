import React from 'react'
import arrayMove from 'array-move'

import { action } from '@storybook/addon-actions'
import { Story } from '@storybook/react'

import SortableList, { SortableItem } from '../../src/index'
import { generateItems } from '../helpers'
import { makeStyles } from '@material-ui/core'

export default {
  component: SortableList,
  title: 'react-easy-sort/With placeholder',
  parameters: {
    componentSubtitle: 'SortableList',
  },
  argTypes: {
    count: {
      name: 'Number of elements',
      control: {
        type: 'range',
        min: 3,
        max: 12,
        step: 1,
      },
      defaultValue: 3,
    },
  },
}

const useStyles = makeStyles({
  list: {
    fontFamily: 'Helvetica, Arial, sans-serif',
    userSelect: 'none',
    display: 'grid',
    gridTemplateColumns: 'auto auto auto',
    gridGap: 16,
    '@media (min-width: 600px)': {
      gridGap: 24,
    },
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(84, 84, 241)',
    color: 'white',
    height: 150,
    cursor: 'grab',
    fontSize: 20,
    userSelect: 'none',
  },
  dragged: {
    backgroundColor: 'rgb(37, 37, 197)',
  },
  placeholder: {
    border: '2px dashed rgb(84, 84, 241)',
    height: 150,
    boxSizing: 'border-box',
    fontSize: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'rgb(84, 84, 241)',
  },
})

type StoryProps = {
  count: number
}

export const Demo: Story<StoryProps> = ({ count }: StoryProps) => {
  const classes = useStyles()

  const [items, setItems] = React.useState<string[]>([])
  React.useEffect(() => {
    setItems(generateItems(count))
  }, [count])

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    action('onSortEnd')(`oldIndex=${oldIndex}, newIndex=${newIndex}`)
    setItems((array) => arrayMove(array, oldIndex, newIndex))
  }

  return (
    <SortableList
      onSortEnd={onSortEnd}
      className={classes.list}
      draggedItemClassName={classes.dragged}
      placeholder={<Placeholder />}
    >
      {items.map((item) => (
        <SortableItem key={item}>
          <div className={classes.item}>{item}</div>
        </SortableItem>
      ))}
    </SortableList>
  )
}

const Placeholder = (): JSX.Element => {
  const classes = useStyles()
  return <div className={classes.placeholder}>Placeholder</div>
}
