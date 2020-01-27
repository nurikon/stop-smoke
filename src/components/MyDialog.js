import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import 
    Dialog,
    {
    DialogContent, 
    DialogButton, 
    DialogFooter
    } 
from 'react-native-popup-dialog';


const { width, height } = Dimensions.get('window');

class MyDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Dialog
            visible={this.props.visible}
            onTouchOutside={this.props.onTouchOutside}
            width={width/2.06}
            height={height/7.98}
        >
            <DialogContent style={styles.DialogContent}>
                <Text style={{fontSize:height/47}}>Sigara içtiniz mi? </Text>
            </DialogContent>
            <DialogFooter>
                <DialogButton
                    textStyle={{color:'green'}}
                    text="Hayır"
                    onPress={this.props.noButton}
                />
                <DialogButton
                    textStyle={{color:'#ff6000'}}
                    text="Evet"
                    onPress={this.props.yesButton}
                />
            </DialogFooter>
        </Dialog>
      </View>
    );
  }
}

export default MyDialog;


const styles={
    DialogContent:{
      backgroundColor: '#ff6000',
        height:height/15.96,
        alignItems:'center',
        justifyContent:'center',
        paddingBottom: 0,
    }
}
