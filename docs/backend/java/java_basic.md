# Java

> 本人已经具有 PHP、Python 和 C++ 的基础，所以 Java 这部分内容就不会记得太多，只会记录一些重要的知识点，或者有价值的参考。

## 基础

### 循环语句 for

支持循环数组内容

```java
public class sample01 {
    public static void main(String[] args) {
        String[] cars = { "Volvo", "BMW", "Ford", "Mazda" };
        for (String i : cars) {
            System.out.println(i);
        }
    }
}
```

### 函数

函数支持**重载**，即使名字相同，但参数不同，可以定义不同的方法。

```java
public class Sample03 {
    // 函数的重载
    static int plusMethod(int x, int y) {
        return x + y;
    }

    static double plusMethod(double x, double y) {
        return x + y;
    }

    public static void main(String[] args) {
        int myNum1 = plusMethod(8, 5);
        double myNum2 = plusMethod(4.3, 6.26);
        System.out.println("int: " + myNum1);
        System.out.println("double: " + myNum2);
    }
}
```

如果要给类初始值，只需要定义一个同名的函数即可。

```java
public class Sample05 {
    // 类的初始化
    int modelYear;
    String modelName;

    public Sample05(int year, String name) {
        modelYear = year;
        modelName = name;
    }

    public static void main(String[] args) {
        Sample05 myCar = new Sample05(2024, "Benz");
        System.out.println(myCar.modelYear + " " + myCar.modelName);
    }
}
```

### 包和 API

可以通过 `import`导入。

```java
import java.util.Scanner;
import mypack.MyPackageClass;

public class Sample06 {
    // import java.util.Scanner;
    public static void main(String[] args) {
        Scanner myObj = new Scanner(System.in);
        System.out.println("Enter username");

        String userName = myObj.nextLine();
        System.out.println("Username is: " + userName);

        // close the scanner
        myObj.close();

        // use the package
        MyPackageClass.main(args);
    }
}
```

### 枚举 enum

其实也是一个类，可以从编译文件看得出来

### 文件 file

```java
import java.io.File; // Import the File class to create file
import java.io.FileWriter; // Import the FileWriter class to write file
import java.io.IOException; // Import the IOException class to handle errors

public class Sample07 {
    public static void main(String[] args) {
        try {
            File myObj = new File("filename.txt");
            if (myObj.createNewFile()) {
                System.out.println("File created: " + myObj.getName());
            } else {
                System.out.println("File already exists.");
            }
            FileWriter myWriter = new FileWriter("filename.txt");
            myWriter.write("Files in Java might be tricky, but it is fun enough!");
            myWriter.close();
            System.out.println("Successfully wrote to the file.");
        } catch (IOException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }
    }
}
```

## 高级

### 单元测试

**常用注解**（Junit 4.xxx）

`@Test` 测试方法必须用它修饰，才能执行测试

`@Before` 修饰实例方法，在每一个测试方法执行前执行一次

​ 适用资源创建

`@After` 修饰实例方法，在每一个测试方法执行后执行一次

​ 适用资源释放

`@BeforClass` 修饰静态方法，在每一个测试方法执行前执行一次

`@AfterClass` 修饰静态方法，在每一个测试方法执行后执行一次

### 反射

基本作用：得到一个类的全部成分然后操作。
