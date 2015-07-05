# AS Modal Dialogs

Modal Dialogs Directives for AngularJS

## Directives

### as-modal-container


Contains modal's trigger and dialog into a &lt;span&gt;&lt;/span&gt; tag.

#### Attributes
##### * trigger ( !OBLIGATORY)
>true | false(default)

Indicates if the modal will be triggered by a button (or simple text), or if it will be showed automatically.

### as-modal-trigger

Shows a button that will trigger the modal dialog. This directive will be hidden if the trigger attribute of as-modal-container is false.

#### Attributes
##### * size
>small | medium(default) | big | none

Sets the button's size (actually it is a css stylized &lt;a&gt; tag). **none** value sets the button as plain text.

##### * color
>blue(default) | green | red

Sets the button's background color. If **size=none** this attribute will set the text color.

##### * display (!OBLIGATORY)
>css property(default:inline)

Sets the css display property to the trigger's container. It is useful if you want that the trigger be in the middle of a text or in a new line.


### as-modal-dialog

The most important directive. It contains the dialog by itself.

#### Attributes

##### * type
>alert(default) | desition

You can specify if the modal will be a simple alert or it will be used to take an important desition. The cancel button of **type=desition** will just hide the modal.

##### * accept-color

>blue(default) | green | red

Sets the accept button's background color. You can choose the red color if you consider that click in the accept button is a dangerous action. If you choose **red**, the cancel button will have a blue color.

##### * mode
>hide(default if type="alert") | link(default if type="desition") | submit

Specify if the accept button will just hide the modal, a &lt;a&gt; tag or the last step of a form. |

##### * action
Use this attribute only if you specified **mode=link**. It will set the href attribute of the &lt;a&gt;  tag.

##### * modal-title (!OBLIGATORY)
Sets the modal's title. 

##### * accept-text
>(optional)default: Ok

Sets the accept button's text.

##### * cancel-text
>(optional)default: Cancel

Sets the cancel button's text.

## CSS Styles (AngularJS constant)

You can use your own css styles for the buttons and the modal dialog box. Just change the value of the **asModalDialogsCss** constant.

### asModalDialogsCss

Reconfigure the asModalDialogsCss constant before injecting the asModalDialogs module to your project.

<pre>angular.module('asModalDialogs')
	.constant('asModalDialogsCss', function () {
		return newObject;
	});

angular.module('YourApp', ['asModalDialogs', /*Other dependencies*/]);
	</pre>

### Object properties (Name of a css class)

#### * button
CSS Class that sets general styles that will be shared between all button's sizes and colors.

#### * redButton
CSS Class that sets the red color.

#### * blueButton
CSS Class that sets the blue color.

#### * greenButton
CSS Class that sets the green color.

#### * smallButton
CSS Class that sets font-size and margin of a small button.

#### * mediumButton
CSS Class that sets font-size and margin of a medium button.

#### * bigButton
CSS Class that sets font-size and margin of a big button.

#### * noButton
CSS Class that reconfigure the button to be a simple text.

**IMPORTANT** You must reconfigure your own color classes using the following syntax:

<pre>.your-no-button-class {
	//new styles
}
.your-no-button-class.your-blue-button-class{
	//new styles
}
.your-no-button-class.your-red-button-class{
	//new styles
}
.your-no-button-class.your-green-button-class{
	//new styles
}
				</pre>

#### * shadow
CSS Class that sets dialog's shadow properties.

#### * modalBox
CSS Class that sets the dialog box styles.

#### * modalContent
CSS Class that sets the dialog text div styles.