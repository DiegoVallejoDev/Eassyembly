# Eassyembly
Eassyembly is a human-readable assembly language 
that is easy to learn and easy to use.
 
The language is based on the following principles:
  1. Register operations are performed as:
      ```pascal
        R1 <- R2 + R3
        R2 <- 45
        R3 <- [R2]    // for offsetting (this is a comment in the code)
        R3 <- [-0xFF] 
      ```
          

        **register name conventions are dependent on the target architecture, not enforced by the language**

  2. sections are created with the following syntax:
        ```.section "name"```

  3. labels are created with the following syntax:
        ```label:```
       and to go to a label:
        ```goto label```
    
  4. assembly functions are created with the following syntax:
       ```
       function name:
        ...
       end function
        ```

       and the function is referenced with the following syntax:
       ```call function```

  5. comments are created with the following syntax:
        ```// comment```
     
  6. variables types are:

        fix the previous example to use the following syntax:
        
        | type | aliases            | description |
        |------|--------------------|-------------|
        | byte | u8, b, b8          | 8-bit       |
        | word | word, w, u16, b16  | 16-bit      |
        | dword | dword, d, u32, b32| 32-bit      |
        | qword | qword, q, u64, b64| 64-bit      |

        and the following syntax is used to declare variables:
        ```pascal
        let name: type
        // example:
        let foo: dword
        let bar: word = 0x1234
        ```


        and the following syntax is used to assign values to variables:
        ```pascal
          name = value

          section bss:
             //in this section, we declare global variables
             let foo: dword
             let bar: word = 0x1234
          end section
   
          section main:
             R1 <- foo
             R2 <- bar
          end section
        ```
      **note tha we use <- for assignment to registers but = for assignment to memory**
                
  7. conditional statements are created with the following syntax:
      ```pascal
        if condition:
          goto label  // do this line if condition is true

        if not condition:
            goto label  // do this line if condition is false

        //example:
          if R1 == R2:
          goto label
      ```
    
    

 1. interrupts are called with:
      ```interrupt ```
        
 2. loops are created with the following syntax:
      ```pascal
        while condition:
          //do this line until condition is true
        end while
      ```
    
    
 3.  suggested predefined interrupt handlers are:
       
        | name   |   description    |
        |--------|------------------|
        | print  | print            |
        | hlt    | halt             |
        | int    | interrupt        |
        | syscall| system call      |
        | trap   | trap             |
        | abort  | abort            |


**This are suggested predefined interrupt handlers, but they depend on the target architecture, and not enforced by the language, they should be implementedby the creator of the target architecture configuration file**
        
         
_EXAMPLE PROGRAM:_
  ```pascal
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
  ```
