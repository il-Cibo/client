import React from 'react'
import { View, StyleSheet, Dimensions, ScrollView, ActivityIndicator } from 'react-native'
const { width } = Dimensions.get('window')
import * as _ from 'lodash'
import Images from './Images'

const ProfileGird = ({
  data,
  columns,
  onEndReachedThreshold,
  onEndReached,
  loading = false,
  onItemClick
}) => {
  const groupEveryNthRow = 3
  const { mainContainer, groupedGridContainer } = styles
  let currentRow = 0 
  const rowArray = _.chunk(data, columns)
  
  let bigImageSide = 'right'

  const renderGroupedItem = (row) => {
    const smallImage1 = row[0]
    const smallImage2 = row[1]
    const largeImage = row[2]
    console.log(smallImage2, 'row');

    if(bigImageSide === 'right') {
      bigImageSide = 'left'

      return (
        <View style={{flexDirection: 'row'}}>
          <View style={groupedGridContainer}>
            <View style={styles.gridStyle}>
              <Images
                style={styles.imageThumbnail}
                sourceObj={smallImage1}
                
                onPress={() => {
                  onItemClick(smallImage1)
                }}
              />
            </View>
            <View style={styles.gridStyle}>
              <Images
                style={styles.imageThumbnail}
                sourceObj={smallImage2}
                
                onPress={() => {
                  onItemClick(smallImage2)
                }}
              />
            </View>
            <View style={styles.gridStyle}>
              <Images
                style={styles.imageThumbnailLarge}
                sourceObj={largeImage}
                
                onPress={() => {
                  onItemClick(largeImage)
                }}
              />
            </View>
          </View>
        </View>
      )
    } else {
      bigImageSide = 'right'

      return (
        <View style={{flexDirection: 'row'}}>
          <View style={styles.gridStyle}>
            <Images
              style={styles.imageThumbnailLarge}
              sourceObj={largeImage}
              
              onPress={() => {
                onItemClick(largeImage)
              }}
            />
          </View>

          <View style={groupedGridContainer}>
            <View style={styles.gridStyle}>
              <Images 
                style={styles.imageThumbnail}
                sourceObj={smallImage1}

                onPress={() => {
                  onItemClick(smallImage1)
                }}
              />
            </View>
            <View style={styles.gridStyle}>
              <Images 
                style={styles.imageThumbnail}
                sourceObj={smallImage2}

                onPress={() => {
                  onItemClick(smallImage2)
                }}
              />
            </View>
          </View>
        </View>
      )
    }
  }

  const renderSingleItem = (item) => {
    console.log(item, 'item di render single item');
    return (
      <View style={styles.gridStyle}>
        <Images 
          style={styles.imageThumbnail}
          sourceObj={item}

          onPress={() => {
            onItemClick(item)
          }}
        />
      </View>
    )
  }

  const renderCell = (row) => {
    if(row.length >= columns && currentRow % groupEveryNthRow === 0) {
      currentRow++
      return <View>{renderGroupedItem(row)}</View>
    }
    currentRow++

    return (
      <View style={{flexDirection: 'row'}}>
        {
          row.map((item) => {
            return renderSingleItem(item)
          })
        }
      </View>
    )
  }
  
  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20

    return (
      layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom
    )
  }

  const renderFooter = () => {
    return (
      <View style={{marginBottom: 16}}>
        <ActivityIndicator animating size='large' />
      </View>
    )
  }

  return (
    <ScrollView
      scrollEventThrottle={onEndReachedThreshold}
      onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
          onEndReached()
        }
      }}
    >
      <View style={mainContainer}>
        {
          rowArray.map((row) => {
            return renderCell(row)
          })
        }
      </View>

      {loading && renderFooter()}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%'
  },
  groupedGridContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  imageThumbnail: {
    height: width / 3,
    width: width / 3,
    resizeMode: 'stretch',
    alignSelf: 'flex-start',
    justifyContent: 'flex-start'
  },
  imageThumbnailLarge: {
    height: width * 0.6 + 12,
    width: width * 0.6  + 12,
    marginLeft: 4,
    resizeMode: 'stretch',
    alignSelf: 'flex-start',
    justifyContent: 'flex-start'
  },
  gridStyle: {
    margin: 4
  }
})

export default ProfileGird