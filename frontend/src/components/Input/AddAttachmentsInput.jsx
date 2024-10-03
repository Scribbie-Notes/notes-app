import React, { useState } from 'react'


const AddAttachmentsInput=()=>{

	return(
<div>
<div className='flex items-center gap-4'>
		<input
		type="file"
		multiple

		/>
		</div>
		</div>
	)
}

export default AddAttachmentsInput;
