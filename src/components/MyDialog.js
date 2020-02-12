import React, { Component } from 'react';
import { View, Text, Dimensions, TextInput } from 'react-native';
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

    render() {
        const {
            visible,
            onTouchOutside,
            contentText,
            textInput,
            noButton,
            yesButton,
            rightButtonText,
            leftButtonText
        } = this.props
        const { dialogContent, textInputStyle, contentTextStyle} = styles
        return (
            <View>
                <Dialog
                    visible={visible}
                    onTouchOutside={onTouchOutside}
                    width={width/1.87}
                    height={ textInput ? height/5 : height/7.25 }

                >
                    <DialogContent style={dialogContent}>
                        <Text style={contentTextStyle}> {contentText} </Text>
                    </DialogContent>
                    <View style={{ alignItems: 'center' }} >
                        {textInput ?
                            <TextInput
                                maxLength={2}
                                keyboardType={'numeric'}
                                style={textInputStyle}
                                onChangeText={(val)=>{this.props.onChangeText(val)}}
                                />
                            :
                            null
                        }
                    </View>

                    <DialogFooter bordered={false}>
                        <DialogButton
                            textStyle={{ color: 'green' }}
                            text={leftButtonText}
                            onPress={noButton}
                        />
                        <DialogButton
                            textStyle={{ color: '#ff6000' }}
                            text={rightButtonText}
                            onPress={yesButton}
                        />
                    </DialogFooter>
                </Dialog>
            </View>
        );
    }
}

export default MyDialog;


const styles = {
    dialogContent: {
        height: height / 13.3,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 0,
        paddingTop: 0,
    },
    textInputStyle: {
        fontSize: height/53.2,
        height: height/20,
        width: width/10,
        paddingBottom: 0,
        paddingTop: 0,
        borderWidth: 0.5,
        borderRadius: 5,
        textAlign: 'center',
        borderColor: '#CFCFCF'
    },
    contentTextStyle:{
        fontSize: height / 50,
        textAlign: 'center'
    }
}
