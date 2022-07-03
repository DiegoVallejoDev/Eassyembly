// Eassyembly
// Copyright (c) 2022 Diego Vallejo. All rights reserved.
// GitHub: @DiegoVallejoDev
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
// Version: 0.0.1
// Date: 7/2/2022

/*******************************************************************************
 * Eassyembly is a human-readable assembly language 
 * that is easy to learn and easy to use.
 
    The language is based on the following principles:
     *?1. Register operations are performed as:
        R1 <- R2 + R3
        R2 <- 45
        R3 <- R1[+0xFF] // for offsetting (this is a comment in the code)
                        // + means add, - means subtract and * means multiply

        *! register name conventions are dependent on the target architecture,
        *! not enforced by the language

     *?2. sections are created with the following syntax:
        .section "name"

     *?3. labels are created with the following syntax:
            label:
          and to go to a label:
            goto label
    
     *?4. assembly functions are created with the following syntax:
        function name:
        ...
        end function

        and the function is referenced with the following syntax:
        call function

     *?5. comments are created with the following syntax:
        // comment
     
     *?6. variables types are:

        fix the previous example to use the following syntax:
        |------|--------------------|-------------|
        | type | aliases            | description |
        |------|--------------------|-------------|
        | byte | u8, b, b8          | 8-bit       |
        | word | word, w, u16, b16  | 16-bit      |
        | dword | dword, d, u32, b32| 32-bit      |
        | qword | qword, q, u64, b64| 64-bit      |
        |------|--------------------|-------------|

        and the following syntax is used to declare variables:
          let name: type

          example:
            let foo: dword
            let bar: word = 0x1234


        and the following syntax is used to assign values to variables:
          name = value

          *! note tha we use <- for assignment to registers, 
          *! but = for assignment to memory
         
            example:

            section bss:
                //in this section, we declare global variables
                let foo: dword
                let bar: word = 0x1234
            end section

            section main:
                R1 <- foo
                R2 <- bar
                
     *?7. conditional statements are created with the following syntax:
        if condition:
          goto label  // do this line if condition is true

        if not condition:
            goto label  // do this line if condition is false

        example:
            if R1 == R2:
                goto label
    
    

    *?8. interrupts are called with:
        interrupt 
        
    *?9. loops are created with the following syntax:
        while condition:
            //do this line until condition is true
        end while
    
    
    *?10. suggested predefined interrupt handlers are:
       
         |-------|------------------|
         | name  |   description    |
         |-------|------------------|
         | print | print            |
         | hlt   | halt             |
         | int   | interrupt        |
         | syscall| system call     |
         | trap  | trap             |
         | abort | abort            |
         |-------|------------------|

         *! this are suggested predefined interrupt handlers,
         *! but they depend on the target architecture, and
         *! not enforced by the language, they should be implemented
         *! by the creator of the target architecture configuration file
        
         
    EXAMPLE PROGRAM:
    
    function sqrt:
      // do a square root of a number 
      // and store the result in R1
      // number is expected to be in R1
      // at the end result is stored in R1
      let x: dword
      let y: dword
      let z: dword

        x = R1
        y = 0
        z = 0

        while y < x:
            y = y + 1
            z = z + y
        end while

        R1 <- z
        end function

    section bss:
        let x: dword
    
    section main:
        x = 0x12345678
        R1 <- x
        call sqrt
        print "sqrt(x) = "
        print R1
        hlt
    end section

 ******************************************************************************/


// Proof of concept in javascript:
// Eassyembly compiler

class Eassyembly {

    constructor() {
        this.code = [];
        this.data = [];
        this.labels = [];
        this.functions = [];
        this.sections = [];
        this.variables = [];
        this.interrupts = [];
        this.loops = [];
        this.predefinedInterrupts = [];
        this.predefinedInterrupts.push({
            name: "print",
            description: "print"
        });
        this.predefinedInterrupts.push({
            name: "hlt",
            description: "halt"
        });
        this.predefinedInterrupts.push({
            name: "int",
            description: "interrupt"
        });
        this.predefinedInterrupts.push({
            name: "syscall",
            description: "system call"
        });
        this.predefinedInterrupts.push({
            name: "trap",
            description: "trap"
        });
        this.predefinedInterrupts.push({
            name: "abort",
            description: "abort"
        });
    }

    compile(code) {
        this.code = code;
        this.parse();
        this.assemble();
        return this.code;
    }

    parse() {
        let lines = this.code.split("\n");
        // remove comments
        lines = lines.map(line => {
            let comment = line.indexOf("//");
            if (comment != -1) {
                line = line.substring(0, comment);
            }
            return line;
        }
        );

        // remove empty lines
        lines = lines.filter(line => {
            return line.length > 0;
        }
        );

        // Work in progress Diego Vallejo - 7/2/2022

    }
}
